# Installation

Dependencies

```bash
yarn add react react-dom draft-js styled-components d3-interpolate @devexpress/dx-chart-core @devexpress/dx-react-core @devexpress/dx-react-chart
```

Content editor
```bash
yarn add @seine/editor
```

# Usage

Default blocks editor

```jsx
import { Editor } from '@seine/editor';

const data = [
  {
    id: '5eec4cb7',
    type: 'page',
    parent_id: null,
    body: {},
    format: {},
    schema: null,
  },
  {
    id: '61272942',
    type: 'draft',
    parent_id: '5eec4cb7',
    body: {
      blocks: [
        {
          key: '2n1g7',
          data: {},
          text: 'Text content',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    format: {},
    schema: null,
  },
];

function DataEditor() {
  const [blocks, setBlocks] = React.useState();
  return <Editor onChange={setBlocks}>{blocks}</Editor>;
}
```
