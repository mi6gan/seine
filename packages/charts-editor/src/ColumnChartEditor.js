// @flow
import * as React from 'react';
import { ForeignInput } from '@seine/ui';
import type { ColumnChartGroupProps } from '@seine/charts';
import { ChartLegendItem, ColumnChart, ColumnChartGroup } from '@seine/charts';
import { UPDATE_ELEMENT, UPDATE_ELEMENT_BY_GROUP } from '@seine/core';

import type { ChartEditorProps as Props } from './types';
import ChartLegendItemInput from './ChartLegendItemInput';

/**
 * @description Editor of column chart
 * props {Props}
 * @returns {React.Node}
 */
export default function ColumnChartEditor({
  dispatch,
  editor,
  ...chartProps
}: Props) {
  return <ColumnChart {...chartProps} as={ColumnChartEditorView} />;
}

// eslint-disable-next-line
function ColumnChartEditorView({ children, dispatchElements, ...viewProps }) {
  return (
    <svg {...viewProps}>
      {React.Children.map(children, (child: ?React.Node) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case ChartLegendItem:
              return [
                child,
                <ChartLegendItemInput
                  {...child.props}
                  key={[child.key, 'input']}
                  id={child.key}
                  dispatchElements={dispatchElements}
                />,
              ];

            case ColumnChartGroup:
              const {
                elements,
                fontSize,
                group,
                lineHeight,
                palette,
                size,
                x,
                y,
              }: ColumnChartGroupProps = child.props;
              const groupFontSize = fontSize * 1.3;

              return [
                child,
                <ForeignInput
                  align={'center'}
                  fontSize={groupFontSize}
                  height={size}
                  key={[child.key, 'input']}
                  lineHeight={lineHeight}
                  onChange={({ currentTarget }) =>
                    dispatchElements({
                      type: UPDATE_ELEMENT_BY_GROUP,
                      body: { group: currentTarget.value },
                      group,
                    })
                  }
                  value={group}
                  width={size * elements.length}
                  x={x}
                  y={y + (fontSize * lineHeight) / 4}
                />,
                ...elements.map(({ index, value }, order) => (
                  <ForeignInput
                    color={palette[order % palette.length]}
                    fontSize={0.9 * fontSize}
                    height={size}
                    key={[child.key, 'input', order]}
                    lineHeight={lineHeight}
                    onChange={({ currentTarget }) =>
                      dispatchElements({
                        type: UPDATE_ELEMENT,
                        body: { value: +currentTarget.value },
                        index,
                      })
                    }
                    type={'number'}
                    value={+value}
                    width={size}
                    x={x + size * order}
                    y={y + (fontSize * lineHeight) / 4 + size}
                  />
                )),
              ];

            default:
              return child;
          }
        }
      })}
    </svg>
  );
}
