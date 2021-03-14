// @flow
import * as React from 'react';

import useElementOnlyProps from '../useElementOnlyProps';

import { defaultItemFormat } from '@seine/core';

const RootShape = React.forwardRef(function RootShape(props, ref) {
  return <svg {...useElementOnlyProps(props, defaultItemFormat)} ref={ref} />;
});

export default RootShape;
