# Installation


Install React
```bash
yarn add react react-dom
```

Material UI
```bash
yarn add @material-ui/core @material-ui/icons @material-ui/styles
```

# Usage
Rendering blocks
```jsx
import { Content } from '@seine/content';

const data = [
  {
    "id": "5eec4cb7",
    "type": "page",
    "parent_id": null,
    "body": {},
    "format": {},
    "schema": null
  },
  {
    "id": "61272942",
    "type": "draft",
    "parent_id": "5eec4cb7",
    "body": {
      "blocks": [
        {
          "key": "2n1g7",
          "data": {},
          "text": "Text content",
          "type": "unstyled",
          "depth": 0,
          "entityRanges": [],
          "inlineStyleRanges": []
        }
      ],
      "entityMap": {}
    },
    "format": {},
    "schema": null
  },
]

function DataContent() {
  return <Content>{data}</Content>;
}
```
