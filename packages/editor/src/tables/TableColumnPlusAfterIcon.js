// @flow
import * as React from 'react';

import { SvgIcon } from '../../mui-core.macro';

// eslint-disable-next-line
export default function TableColumnPlusAfterIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"
      />
    </SvgIcon>
  );
}
