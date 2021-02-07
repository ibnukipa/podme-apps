/* @flow */

import { Api$ } from 'states/apis/_api';
import type { ExtraApiOptions } from 'states/apis/_api';

const getPods$ = ({ params }: ExtraApiOptions = {}) =>
  Api$({
    url: 'api/pods',
    method: 'get',
    params,
  });

export default getPods$;
