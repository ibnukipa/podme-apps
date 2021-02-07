/* @flow */

import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'constants/colors';
import styleHeader from 'constants/styleHeader';
import spaceSize from 'constants/spaceSize';

import Container from 'components/Container';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Divider from 'components/Divider';
import Button from 'components/Button';

import { facilitySelector, podSelector } from 'states/reducers/pod';
import { normalizeResponse } from 'states/reducers/_db';
import getPod from 'states/apis/getPod';
import useAxios from 'hooks/useAxios';

import { useNavigation } from '@react-navigation/native';

const PodHeader = ({ id }) => {
  const navigation = useNavigation();
  const pressBack = useCallback(() => navigation.goBack(), [navigation]);
  const pod = useSelector((state) => podSelector(state, id));
  return (
    <View style={[styleHeader.container, styleHeader.containerLeft]}>
      <Icon onPress={pressBack} size={'huge'} name="arrow-back" color={Colors.white} />
      <Text
        style={styleHeader.titleLeft}
        numberOfLines={1}
        size={'large'}
        medium
        color={Colors.white}
      >
        {pod.name}
      </Text>
    </View>
  );
};
const FACILITY_ICONS_COLORS = [Colors.primary, Colors.blueGray700, Colors.deppPurple, Colors.blue];
const FacilitySnippet = ({ id }) => {
  const facility = useSelector((state) => facilitySelector(state, id));
  const color = FACILITY_ICONS_COLORS[Math.floor(Math.random() * FACILITY_ICONS_COLORS.length)];
  return (
    <View style={styles.facilityContainer}>
      <View style={[styles.facilityIcon, { backgroundColor: color }]}>
        <Text bolder color={Colors.white}>
          {facility.name?.[0]}
        </Text>
      </View>
      <Text>{facility.name}</Text>
    </View>
  );
};

const Pod: () => React$Node = ({ route }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

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
    () => (insets.bottom > 0 ? insets.bottom : insets.bottom + spaceSize.medium),
    [insets]
  );
  const renderFacility = useCallback((facilityId) => (
    <FacilitySnippet key={`pod-facility-${facilityId}`} id={facilityId} />
  ));
  return (
    <Container header={<PodHeader id={id} />} backgroundColor={Colors.white}>
      <ScrollView>
        <Image source={{ uri: pod.banner }} style={styles.podImage} resizeMode="cover" />
        <View style={styles.podContent}>
          <Text bold color={Colors.primary} size={'xxLarge'}>
            {pod.name}
          </Text>
          <Divider />
          <Text color={Colors.blueGray}>{pod.description}</Text>
          <Divider space={spaceSize.large} />
          <Text>{pod.detail}</Text>
          <Divider space={spaceSize.large} />
          <Text bold color={Colors.primary} size={'small'}>
            FACILITIES
          </Text>
          {pod.facilities?.map(renderFacility)}
        </View>
      </ScrollView>
      <View style={[styles.floatingForm, { paddingBottom: paddingBottom() }]}>
        <Text medium size={'large'} color={Colors.secondary}>
          ${pod.price} <Text color={Colors.blueGray100}>/ pax</Text>
        </Text>
        <Button containerStyle={{ height: spaceSize.xxxLarge }} text={'BOOK'} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  podImage: {
    height: 300,
  },
  podContent: {
    padding: spaceSize.medium,
  },
  floatingForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spaceSize.medium,
    backgroundColor: Colors.gray,
  },
  facilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spaceSize.xxSmall,
  },
  facilityIcon: {
    marginRight: spaceSize.small,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pod;
