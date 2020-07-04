// @flow
import styled from 'styled-components/macro';

const Item = styled.div`
  position: relative;
  ${({ grow, shrink, alignSelf }) => ({
    flexGrow: grow,
    flexShrink: shrink,
    alignSelf,
  })}
`;

export default Item;
