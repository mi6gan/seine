// @flow
import * as React from 'react';

import useElementOnlyProps from '../useElementOnlyProps';

import { defaultItemFormat } from '@seine/core';

const RootShape = React.forwardRef(function RootShape(props, ref) {
  return (
    <svg
      {...useElementOnlyProps(props, defaultItemFormat)}
      ref={ref}
      width={'100%'}
      height={'100%'}
    />
  );
});

export default RootShape;
