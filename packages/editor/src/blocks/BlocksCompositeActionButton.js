// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';

type Action = { type: string, [string]: any };

type Props = {
  actions: Action[],
  dispatch: (Action) => any,
};

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlocksCompositeActionButton({
  actions,
  as: Button = MuiButton,
  dispatch,
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      onClick={useAutoCallback(() => actions.forEach(dispatch))}
    />
  );
}
