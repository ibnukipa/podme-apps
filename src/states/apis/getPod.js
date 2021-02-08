/* @flow */

import { ApiAxios } from 'states/apis/_api';
import type { ExtraApiOptions } from 'states/apis/_api';

const getPod = ({ data = {}, params }: ExtraApiOptions = {}): Promise =>
  ApiAxios({
    url: `api/pod/${data.id}`,
    method: 'get',
    params,
  });

export default getPod;
