import * as React from 'react';
import { actions } from '@storybook/addon-actions';
import { Content } from '@seine/content';
import { Editor } from '@seine/editor';

export default { title: 'Default.Single.RichText' };

export const SingleLineContent = ({ as: Component = Content, ...props }) => (
  <Component
    {...props}
    parent={{
      id: null,
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '15402f46-8545-4804-aa93-e492dbb2b1d3',
        type: 'draft',
        body: {
          blocks: [
            {
              key: 'h1',
              text: 'Header one',
              type: 'header-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h2',
              text: 'Header two',
              type: 'header-two',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h3',
              text: 'Header three',
              type: 'header-three',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h4',
              text: 'Header four',
              type: 'header-four',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h5',
              text: 'Header five',
              type: 'header-five',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h6',
              text: 'Header six',
              type: 'header-six',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'unstyled',
              text:
                'This block is draft.js content. Click here to edit the text.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        format: { verticalAlignment: 'center' },
        parent_id: null,
      },
    ]}
  </Component>
);
export const EditorOfSingleLineContent = () => (
  <SingleLineContent as={Editor} {...actions('onChange')} />
);

export const MultilineContent = ({ as: Component = Content, ...props }) => (
  <Component
    {...props}
    parent={{
      id: null,
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '15402f46-8545-4804-aa93-e492dbb2b1d3',
        type: 'draft',
        body: {
          blocks: [
            {
              key: '3ofq1',
              text:
                'This block is draft.js content. Click here to edit the text.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '99k9b',
              text: '',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '3hni1',
              text: 'We are planning to add text formatting toolbar soon.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '5d97a',
              text: '',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'cgfs1',
              text:
                'Draft.js is a framework for building rich text editors in React,',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'pu3o',
              text:
                'powered by an immutable model and abstracting over cross-browser differences.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        format: { verticalAlignment: 'center' },
        parent_id: null,
      },
    ]}
  </Component>
);

export const ListsContent = ({ as: Component = Content, ...props }) => (
  <Component
    {...props}
    parent={{
      id: null,
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '15402f46-8545-4804-aa93-e492dbb2b1d3',
        type: 'draft',
        body: {
          blocks: [
            {
              key: '6cab3',
              data: {},
              text:
                'Commercial trucks are classified into three categories according to the gross vehicle weight:',
              type: 'unstyled',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: '1v51j',
              data: {},
              text: 'Light-duty trucks (0 to 5  tonnes)',
              type: 'ordered-list-item',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: 'e54v8',
              data: {},
              text: 'Medium-duty trucks (6 to 9  tonnes)',
              type: 'ordered-list-item',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: '6j2m1',
              data: {},
              text: 'Heavy-duty trucks (10 to 16  tonnes and above)',
              type: 'ordered-list-item',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: '38tn',
              data: {},
              text:
                'The heavy-duty truck segment can be further broken down into two groups:',
              type: 'unstyled',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: 'dmd6c',
              data: {},
              text: 'Regular-duty (10 to 15 tonnes)',
              type: 'unordered-list-item',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: '234bo',
              data: {},
              text: 'Severe-duty (16 tonnes and above)',
              type: 'unordered-list-item',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
            {
              key: '2g94m',
              data: {},
              text:
                'Customers are increasingly shifting from using medium-duty trucks to light-duty trucks and heavy-duty trucks. The main benefits of light-duty trucks include fuel efficiency, increased mobility, and modification possibilities. Conversely, heavy-duty trucks provide better economic efficiency for long-distance transportation.',
              type: 'unstyled',
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
            },
          ],
          entityMap: {},
        },
        format: { verticalAlignment: 'center' },
        parent_id: null,
      },
    ]}
  </Component>
);

export const EditorOfMultilineContent = () => (
  <MultilineContent as={Editor} {...actions('onChange')} />
);
