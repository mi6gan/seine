// @flow
import * as React from 'react';

import { DURATION_RE } from './Duration.helpers';

type Props = {
  children: React.Node,
  as?: React.ElementType,
  /** @deprecated */
  component?: React.ElementType,
};

/**
 * @description Output duration as "<days>d <hours>h:<minutes>m:<seconds>s"
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Duration({
  children,
  component = 'span',
  as: Component = component,
}: Props) {
  let duration = children;
  if (typeof duration === 'number') {
    const date = new Date(0);
    date.setTime(duration);
    [, duration] = date.toISOString().split('T');
    duration = duration.slice(0, -1);
  }
  const matched = duration.match(DURATION_RE);
  const { D = 0, H = 0, M = 0, s = 0 } = matched ? matched.groups : {};
  const [hours = 0, minutes = 0, seconds = 0] = [D * 24 + H, M, s].map((v) =>
    String(+v).padStart(2, '0')
  );
  return (
    <Component>
      {hours}:{minutes}:{seconds}
    </Component>
  );
}
