/* @flow */

import { createRef } from 'react';

const routerRef = createRef();
const isReadyRouterRef = createRef();

const navigate = (name, params) => {
  if (isReadyRouterRef.current && routerRef.current) {
    routerRef.current.navigate(name, params);
  }
};

export { routerRef, isReadyRouterRef, navigate };
