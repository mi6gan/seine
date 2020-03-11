// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';
import { useResizeTargetRef } from '@seine/styles';

type Props = {
  children: React.Node,
};

const ChartLayoutTitleText = styled.span`
  display: inline-block;
  transform-origin: left bottom;
  transform: scale(${({ scale }) => scale});
  white-space: nowrap;
  width: 100%;
`;

const TextBox = styled(ChartLayoutTitleText)`
  position: absolute;
  visibility: hidden;
  z-index: -1;
  width: 100%;
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
  const titleElementRef = useResizeTargetRef();
  const { current: titleElement } = titleElementRef;

  const textBoxRef = React.useRef(null);
  const { current: textBox } = textBoxRef;

  const titleElementWidth = titleElement && titleElement.offsetWidth;
  const textWidth = textBox && textBox.offsetWidth;
  const scale = useAutoMemo(() => {
    if (titleElementWidth) {
      if (titleElementWidth < textWidth) {
        return titleElementWidth / textWidth;
      }
    }
    return 1;
  });

  return (
    <Container {...containerProps} ref={titleElementRef}>
      <TextBox ref={textBoxRef}>{children}</TextBox>
      {textBox && (
        <ChartLayoutTitleText scale={scale}>{children}</ChartLayoutTitleText>
      )}
    </Container>
  );
})`
  ${({ theme: { typography } }) => typography.h3};
  text-align: ${({ textAlignment }) => textAlignment};
  height: 3.5rem;
  position: relative;
  overflow: hidden;
`;
