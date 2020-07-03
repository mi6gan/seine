// @flow
export type FlexBody = {};

export type FlexFormat = {
  direction: 'row' | 'column',
  wrap: 'wrap' | 'nowrap',
  justify:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
  alignContent:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around',
};

export const FLEX = 'flex';
