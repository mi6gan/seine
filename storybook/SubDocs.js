// @flow
import * as React from 'react';
import { ArgsTable, Subheading } from '@storybook/addon-docs/blocks';

import Description from './Description';

// eslint-disable-next-line
export default function SubDocs({ of }) {
  return (
    <>
      <Subheading>{of.name}</Subheading>
      <Description of={of} />
      <ArgsTable of={of} />
    </>
  );
}
