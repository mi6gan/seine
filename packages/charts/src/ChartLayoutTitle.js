// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';
import {
  useOffscreenCanvas,
  useResizeTargetRef,
  useTheme,
  useTypographyChildren,
} from '@seine/styles';

type Props = {
  children: React.Node,
};

const ChartLayoutTitleText = styled.span`
  display: inline-block;
  transform-origin: 0 0;
  transform: scale(${({ scale }) => scale});
  white-space: pre;
`;

/**
 * @description Chart layout title that scales to fit in line
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled(function ChartLayoutTitle({
  as: Container = 'h3',
  children,
  ...containerProps
}: Props) {
  const canvas = useOffscreenCanvas();
  const titleElementRef = useResizeTargetRef();
  const { current: titleElement } = titleElementRef;
  const theme = useTheme();
  const { fontWeight = 400, fontSize, fontFamily } = useAutoMemo(
    titleElement ? getComputedStyle(titleElement) : theme.typography.h3
  );

  const titleElementWidth =
    titleElement && titleElement.getBoundingClientRect().width;
  const text = useTypographyChildren(children);
  const scale = useAutoMemo(() => {
    if (titleElementWidth) {
      const context = canvas.getContext('2d');
      context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
      const {
        actualBoundingBoxRight: right = 0,
        actualBoundingBoxLeft: left = 0,
        actualBoundingBoxAscent: ascent = 0,
        actualBoundingBoxDescent: descent = 0,
        width,
      } = context.measureText(text);
      const textWidth = Math.max(width, right - left + (ascent - descent));
      if (titleElementWidth < textWidth) {
        return titleElementWidth / textWidth;
      }
    }
    return 1;
  });

  return (
    <Container {...containerProps} ref={titleElementRef}>
      <ChartLayoutTitleText scale={scale}>{children}</ChartLayoutTitleText>
    </Container>
  );
})`
  ${({ theme: { typography } }) => typography.h3};
  text-align: ${({ textAlignment }) => textAlignment};
  height: 3.5rem;
`;
