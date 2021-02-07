/* @flow */

import React from 'react';
import Colors from 'constants/colors';

import Container from 'components/Container';
import Text from 'components/Text';
import Icon from 'components/Icon';

const Pod: () => React$Node = () => (
  <Container backgroundColor={Colors.white}>
    <Text bolder>test</Text>
    <Icon />
  </Container>
);

export default Pod;
