// @flow
import * as React from 'react';
import doctrine from 'doctrine';
import {
  Description as DefaultDescription,
  DocsContext,
} from '@storybook/addon-docs/blocks';

// eslint-disable-next-line
export default function Description({ of }) {
  const { parameters } = React.useContext(DocsContext);
  const { tags } = doctrine.parse(
    (of === '.' ? parameters.component : of).__docgenInfo.description
  );
  const description = tags.find(({ title }) => title === 'description') || null;
  return (
    <DefaultDescription>
      {description && description.description}
    </DefaultDescription>
  );
}
