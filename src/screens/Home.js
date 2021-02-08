/* @flow */

import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'constants/colors';
import spaceSize from 'constants/spaceSize';
import styleHeader from 'constants/styleHeader';

import Container from 'components/Container';
import Text from 'components/Text';
import Icon from 'components/Icon';
import ListEmpty from 'components/ListEmpty';
import IconLoading from 'components/IconLoading';
import Image from 'components/Image';
import Divider from 'components/Divider';
import Button from 'components/Button';
import Touchable from 'components/Touchable';

import {
  podListRequested,
  podListSelector,
  podListStateSelector,
  podSelector,
} from 'states/reducers/pod';
import { deAuthenticated } from 'states/reducers/auth';
import useInfiniteFetch from 'hooks/useInfiniteFetch';

import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const dispatch = useDispatch();
  return (
    <View style={styleHeader.container}>
      <Icon
        onPress={() => dispatch(deAuthenticated())}
        size={'huge'}
        name="pie-chart"
        color={Colors.white}
      />
      <Text size={'huge'} bolder color={Colors.white}>
        PodMe
      </Text>
      <Icon onPress={() => {}} size={'huge'} name="mail" color={Colors.white} label="99" />
    </View>
  );
};

const PodSnippet = memo(({ id }) => {
  const navigation = useNavigation();
  const pod = useSelector((state) => podSelector(state, Number(id)));
  const goToPodDetail = useCallback(() => navigation.navigate('Pod', { id }), [navigation]);
  const goToPodSchedule = useCallback(() => navigation.navigate('PodSchedule', { id }), [
    navigation,
  ]);

  return (
    <View>
      <View style={styles.podSnippetContainer}>
        <Image
          onPress={goToPodDetail}
          source={{ uri: pod.banner }}
          style={styles.podSnippetImage}
          resizeMode="cover"
        />
        <View style={styles.podSnippetContent}>
          <Touchable onPress={goToPodDetail}>
            <Text bold color={Colors.primary} size={'xxLarge'}>
              {pod.name}
            </Text>
          </Touchable>
          <Divider />
          <Text color={Colors.blueGray}>{pod.description}</Text>
          <Divider space={spaceSize.large} />
          <View style={styles.podSnippetAction}>
            <Text medium size={'large'} color={Colors.secondary}>
              ${pod.price} <Text color={Colors.blueGray100}>/ pax</Text>
            </Text>
            <Button
              onPress={goToPodSchedule}
              containerStyle={{ height: spaceSize.xxxLarge }}
              text={'BOOK'}
            />
          </View>
        </View>
      </View>
      <Divider line space={spaceSize.xxxLarge} />
    </View>
  );
});

const Home: () => React$Node = () => {
  const insets = useSafeAreaInsets();
  const [podsFetchMore, podsFetch] = useInfiniteFetch(podListRequested);
  const podsState = useSelector((state) => podListStateSelector(state));
  const pods = useSelector((state) => podListSelector(state));
  useEffect(() => {
    podsFetch?.({ isReFetch: true });
  }, [podsFetch]);
  const onPodsRefresh = useCallback(() => {
    podsFetch({ isClearing: true });
  }, [podsFetch]);
  const onPodsEndReached = useCallback(() => {
    if (podsState.meta.hasNext && !podsState.fetchingMore) {
      podsFetchMore();
    }
  }, [podsFetchMore, podsState.meta, podsState.fetchingMore]);
  const renderPodsKey = useCallback((item) => item.id.toString(), []);
  const renderPodsSnippet = useCallback(({ item }) => <PodSnippet id={item.id} />, []);
  const renderPodsEmpty = useCallback(() => <ListEmpty listState={podsState} />, [podsState]);
  const renderPodsFooter = useCallback(
    () => <IconLoading padded message={'Loading more...'} />,
    []
  );
  return (
    <Container backgroundColor={Colors.white} header={<HomeHeader />}>
      <FlatList
        refreshing={false}
        onRefresh={onPodsRefresh}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        data={pods}
        keyExtractor={renderPodsKey}
        renderItem={renderPodsSnippet}
        onEndReachedThreshold={0.9}
        onEndReached={onPodsEndReached}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        ListEmptyComponent={renderPodsEmpty}
        ListFooterComponent={podsState.fetchingMore && renderPodsFooter}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  podSnippetContainer: {
    backgroundColor: Colors.white,
  },
  podSnippetImage: {
    height: 200,
  },
  podSnippetContent: {
    paddingHorizontal: spaceSize.medium,
    paddingTop: spaceSize.medium,
  },
  podSnippetAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
