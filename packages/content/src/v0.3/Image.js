// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

export const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

// eslint-disable-next-line
export default function Image_v0_3({
  as: Img = 'img',
  align,
  alt,
  file,
}: Props) {
  return (
    <ImageContainer>
      <Img alt={alt} align={align} src={file} />
    </ImageContainer>
  );
}
