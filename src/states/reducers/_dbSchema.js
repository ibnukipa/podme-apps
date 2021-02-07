/* @flow */

import { schema } from 'normalizr';

export const user = new schema.Entity('users', {});
export const facility = new schema.Entity('facilities', {});
export const pod = new schema.Entity('pods', {
  facilities: [facility],
});
