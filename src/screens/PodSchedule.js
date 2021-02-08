/* @flow */

import React, { useCallback, useEffect, memo, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'constants/colors';
import spaceSize from 'constants/spaceSize';
import showToast from 'utils/toast';

import Container from 'components/Container';
import Text from 'components/Text';
import Button from 'components/Button';
import Touchable from 'components/Touchable';
import Icon from 'components/Icon';
import Divider from 'components/Divider';
import { PodHeader } from 'screens/Pod';

import { podSelector } from 'states/reducers/pod';
import { normalizeResponse } from 'states/reducers/_db';
import getPod from 'states/apis/getPod';
import useAxios from 'hooks/useAxios';

import {
  format,
  eachHourOfInterval,
  setHours,
  getHours,
  differenceInHours,
  isSameHour,
  addDays,
} from 'date-fns';
import { clone, isEmpty } from 'lodash-es';

const TIME_TYPES = ['BOOKED', 'FULLY-BOOKED', ''];

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getBookingStatus = () => TIME_TYPES[getRandomArbitrary(0, 3)];

const CellTime = memo(({ time, onPress }) => {
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    let currentStatus = getBookingStatus();
    if (getHours(time) < 7) currentStatus = 'off-peak';
    if (currentStatus === 'BOOKED') currentStatus = `${getRandomArbitrary(1, 3)} BOOKED`;
    setStatus(currentStatus);
  }, []);
  const cellPress = useCallback(() => {
    onPress(time, setSelected);
  }, [status, selected, onPress]);

  return (
    <Touchable onPress={status !== 'FULLY-BOOKED' && cellPress} style={[styles.cell]}>
      <View style={[styles.cellContent, selected && styles.cellContentSelected]}>
        <Text bold color={status !== 'off-peak' ? Colors.primary : Colors.white} size="xSmall">
          {status}
        </Text>
      </View>
    </Touchable>
  );
});

const RowTime = memo(({ time, onPress }) => (
  <View style={styles.row}>
    <View style={styles.cell}>
      <View style={styles.cellHeader}>
        <Text medium color={Colors.blueGray}>
          {format(time, 'p')}
        </Text>
      </View>
    </View>
    <CellTime time={time} onPress={onPress} />
    <CellTime time={addDays(time, 1)} onPress={onPress} />
    <CellTime time={addDays(time, 2)} onPress={onPress} />
  </View>
));

const getTitleDate = (date) => `${format(date, 'iii')}\n${format(date, 'd MMM')}`;

const PodSchedule: () => React$Node = ({ route, navigation }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [startDate] = useState(new Date());

  const pod = useSelector((state) => podSelector(state, id));
  const { fetch: fetchPod } = useAxios(getPod, {
    onResponse: (data) => {
      dispatch(normalizeResponse({ modelName: 'pod', data, isNested: true }));
    },
  });
  useEffect(() => {
    fetchPod({ data: { id } });
  }, [id]);
  const paddingBottom = useCallback(
    () => (insets.bottom > 0 ? insets.bottom : insets.bottom + spaceSize.xSmall),
    [insets]
  );
  const rowPress = useCallback(
    (time, setSelected) => {
      const lastSelectedTime = selectedTimes[selectedTimes.length - 1];
      const curTimes = clone(selectedTimes);
      if (isSameHour(time, lastSelectedTime)) {
        curTimes.pop();
        setSelectedTimes(curTimes);
        setSelected(false);
      } else if (differenceInHours(time, lastSelectedTime) === 1 || !lastSelectedTime) {
        setSelected(true);
        curTimes.push(time);
        setSelectedTimes(curTimes);
      } else {
        showToast('Please book consecutively.');
      }
    },
    [selectedTimes]
  );
  const renderRows = useCallback((time) => (
    <RowTime onPress={rowPress} key={`schedule-${time.toString()}`} time={time} />
  ));
  const renderSelectedDates = useCallback(() => {
    const timeLength = selectedTimes.length;
    if (timeLength === 0) return null;
    const dateString = format(selectedTimes[0], 'iii d MMM');
    return (
      <Text size={'small'} color={Colors.blueGray100}>
        {dateString}
      </Text>
    );
  }, [selectedTimes]);
  const renderSelectedTimes = useCallback(() => {
    const timeLength = selectedTimes.length;
    if (timeLength === 0) return null;
    const startTime = format(selectedTimes[0], 'p');
    return (
      <View style={styles.floatingFormTimes}>
        <Text size={'small'}>{startTime}</Text>
        {timeLength > 1 && (
          <>
            <Divider horizontal />
            <Icon color={Colors.blueGray100} type={'ent'} name={'arrow-long-right'} />
            <Divider horizontal />
            <Text size={'small'}>{format(selectedTimes[timeLength - 1], 'p')}</Text>
          </>
        )}
      </View>
    );
  }, [selectedTimes]);
  const proceedPress = useCallback(() => {
    Alert.alert(
      'Successfully Booked',
      'Wishing you the best in fitness & health.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.popToTop() },
      ],
      { cancelable: false }
    );
  });
  return (
    <Container
      header={<PodHeader id={id} description={'Date and Time'} />}
      backgroundColor={Colors.white}
    >
      <View style={[styles.row, styles.daysContainer]}>
        <View style={styles.cell}>
          <View style={styles.cellHeader} />
        </View>
        <View style={styles.cell}>
          <View style={[styles.cellHeader, styles.cellHeaderCenter]}>
            <Text align={'center'} medium color={Colors.blueGray}>
              {getTitleDate(startDate)}
            </Text>
          </View>
        </View>
        <View style={styles.cell}>
          <View style={[styles.cellHeader, styles.cellHeaderCenter]}>
            <Text align={'center'} medium color={Colors.blueGray}>
              {getTitleDate(addDays(startDate, 1))}
            </Text>
          </View>
        </View>
        <View style={styles.cell}>
          <View style={[styles.cellHeader, styles.cellHeaderCenter]}>
            <Text align={'center'} medium color={Colors.blueGray}>
              {getTitleDate(addDays(startDate, 2))}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spaceSize.uSmall }}
      >
        {eachHourOfInterval({
          start: setHours(startDate, 6),
          end: setHours(startDate, 21),
        }).map(renderRows)}
      </ScrollView>
      <View
        style={[
          styles.floatingForm,
          { paddingBottom: paddingBottom(), height: 60 + paddingBottom() },
        ]}
      >
        <View>
          {renderSelectedDates()}
          <Text medium size={'large'} color={Colors.secondary}>
            ${pod.price} <Text color={Colors.blueGray100}>/ pax</Text>
          </Text>
          {renderSelectedTimes()}
        </View>
        <Button
          onPress={proceedPress}
          isDisabled={isEmpty(selectedTimes)}
          containerStyle={{ height: spaceSize.xxxLarge }}
          text={'PROCEED'}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  floatingForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spaceSize.medium,
    paddingTop: spaceSize.xSmall,
    backgroundColor: Colors.gray,
  },
  floatingFormTimes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
  },
  cell: {
    flex: 1,
    flexGrow: 1,
    flexWrap: 'wrap',
    padding: spaceSize.uSmall,
  },
  cellHeader: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: spaceSize.xxSmall,
  },
  cellHeaderCenter: {
    justifyContent: 'center',
  },
  cellContent: {
    flex: 1,
    width: '100%',
    borderRadius: spaceSize.xxSmall,
    backgroundColor: Colors.blueGray50,
    padding: spaceSize.xxSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellContentSelected: {
    backgroundColor: Colors.primary,
  },
  daysContainer: {
    backgroundColor: Colors.gray,
  },
});

export default PodSchedule;
