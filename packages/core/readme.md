# Installation

```bash
yarn add ramda uuid @seine/core
```

# Usage

Create empty rich text data

```jsx
import { createBlock, blockTypes } from '@seine/core';

const block = createBlock(blockTypes.RICH_TEXT);
```

Create rich text data from string

```jsx
import { toDraftContent } from '@seine/core';
const block = createBlock(blockTypes.RICH_TEXT, toDraftContent(''));
```
