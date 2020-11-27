// @flow
import { createGlobalStyle, css } from 'styled-components/macro';

const RichTextStyle = createGlobalStyle`
  .DraftEditor\\/root, .DraftEditor-root {
  overflow: auto;
  ${({
    theme: {
      typography: { h1, h2, h3, h4, h5, h6, body1 },
    },
  }) => css`
    ${body1};
    h1 {
      ${h1}
    }
    h2 {
      ${h2}
    }
    h3 {
      ${h3}
    }
    h4 {
      ${h4}
    }
    h5 {
      ${h5}
    }
    h6 {
      ${h6}
    }
    ul,
    ol {
      ${{
        ...body1,
        marginTop: 0,
      }}
      & > li {
        display: list-item;
        ${{
          ...body1,
          marginBottom: null,
        }}
      }
  `}
  }
`;

export default RichTextStyle;
