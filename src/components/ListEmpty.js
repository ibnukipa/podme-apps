/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import spaceSize from 'constants/spaceSize';

import Text from 'components/Text';
import Divider from 'components/Divider';
import IconLoading from 'components/IconLoading';

const ListEmpty = ({ listState }) => {
  const { hasError, isLoading } = listState;
  return (
    <View style={styles.container}>
      {isLoading && !hasError ? (
        <IconLoading message={'Loading...'} />
      ) : hasError ? (
        <View style={styles.error}>
          <Text>Could not fetch the data. We do apologize.</Text>
          <Divider />
          <Text>Pull To Refresh</Text>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spaceSize.large,
    paddingHorizontal: spaceSize.medium,
  },
  error: {
    alignItems: 'center',
  },
});

export default ListEmpty;
