// @flow
import * as React from 'react';

import { SvgIcon } from '../../material-ui.macro';

// eslint-disable-next-line
export default function TableRowPlusAfterIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z"
      />
    </SvgIcon>
  );
}
