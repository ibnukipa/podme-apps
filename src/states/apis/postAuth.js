/* @flow */

import { ApiAxios } from 'states/apis/_api';
import type { ExtraApiOptions } from 'states/apis/_api';

export type postAuthResponse = {
  id: number,
  uuid: string,
  avatar: string,
  name: string,
  title: string,
};

const postAuth = ({ data = {} }: ExtraApiOptions = {}): Promise =>
  ApiAxios({
    url: 'api/auth',
    method: 'post',
    body: data,
  });

export default postAuth;
