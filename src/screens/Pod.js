/* @flow */

/* @flow */

import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from 'constants/colors';
import styleHeader from 'constants/styleHeader';
import spaceSize from 'constants/spaceSize';
import styleShadow from 'constants/styleShadow';

import Container from 'components/Container';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Image from 'components/Image';
import Divider from 'components/Divider';
import Button from 'components/Button';

import { podSelector } from 'states/reducers/pod';

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

const Pod: () => React$Node = ({ route }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const pod = useSelector((state) => podSelector(state, id));

  const paddingBottom = useCallback(
    () => (insets.bottom > 0 ? insets.bottom : insets.bottom + spaceSize.medium),
    [insets]
  );
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
});

export default Pod;
