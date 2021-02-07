/* @flow */

import React from 'react';
import Colors from 'constants/colors';

import Container from 'components/Container';
import Text from 'components/Text';
import Icon from 'components/Icon';

const Home: () => React$Node = () => (
  <Container backgroundColor={Colors.white} header={'PodMe'}>
    <Text bolder>test</Text>
    <Icon />
  </Container>
);

export default Home;
