/* @flow */

import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import spaceSize from 'constants/spaceSize';
import Colors from 'constants/colors';
import showToast from 'utils/toast';

import Container from 'components/Container';
import Text from 'components/Text';
import Card from 'components/Card';
import TextInput from 'components/InputText';
import Divider from 'components/Divider';
import Button from 'components/Button';
import KeyboardAware from 'components/KeyboardAware';

import { authenticated } from 'states/reducers/auth';
import postAuth from 'states/apis/postAuth';
import { normalizeResponse } from 'states/reducers/_db';
import useYupResolver from 'hooks/useYupResolver';
import useAxios from 'hooks/useAxios';

import * as yup from 'yup';
import { isEmpty } from 'lodash-es';

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login: () => React$Node = () => {
  const dispatch = useDispatch();
  const [isSigning, setIsSigning] = useState(false);

  // LOGIN FORM
  const { fetch: fetchAuth } = useAxios(postAuth, {
    onResponse: (data) => {
      dispatch(normalizeResponse({ modelName: 'user', data }));
      dispatch(authenticated({ id: data.id }));
    },
    onError: () => {
      showToast(
        'The username you entered does not belong to an account.' +
          'Please check your username and try again.'
      );
      setIsSigning(false);
    },
  });
  const loginFomResolver = useYupResolver(loginValidationSchema);
  const { handleSubmit: loginHandleSubmit, errors: loginErrors, control: loginControl } = useForm({
    resolver: loginFomResolver,
    mode: 'onChange',
  });
  const loginSubmission = useCallback(async (values) => {
    setIsSigning(true);
    fetchAuth({ data: values });
  });

  return (
    <Container containerStyle={[styles.container]}>
      <KeyboardAware centered>
        <Card isLoading={isSigning}>
          <Text bold size={'xHuge'} color={Colors.primary}>
            LOGIN
          </Text>
          <Divider space={spaceSize.small} />
          <TextInput
            isLight
            control={loginControl}
            name={'username'}
            placeholder={'Username'}
            iconPosition={'left'}
            iconName={'person'}
            errorMessage={loginErrors.username?.message}
          />
          <TextInput
            isLight
            secureTextEntry
            control={loginControl}
            name={'password'}
            placeholder={'Password'}
            iconPosition={'left'}
            iconName={'md-key'}
            errorMessage={loginErrors.password?.message}
          />
          <Divider space={spaceSize.small} />
          <Button
            isDimmed={!isEmpty(loginErrors)}
            isLoading={isSigning}
            onPress={loginHandleSubmit(loginSubmission)}
            text={'Sign In'}
          />
        </Card>
      </KeyboardAware>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spaceSize.huge,
  },
});

export default Login;
