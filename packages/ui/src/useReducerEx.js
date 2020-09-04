// @flow
import { useReducer, useRef } from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import type { Action, State } from '@seine/core';

const defaultDevToolsConfig = {};

/**
 * @description Use extended reducer to dispatch changes through redux-devtools.
 * @param {Function} reduce
 * @param {object} initialArg
 * @param {Function} init
 * @param {object} devToolsConfig
 * @returns {[object, Function]}
 */
export default function useReducerEx<S: State, A: Action>(
  reduce: (S, A) => S,
  initialArg: S,
  init: (...any[]) => S,
  devToolsConfig: { [string]: any } = defaultDevToolsConfig
) {
  // reference to last dispatched action
  const historyRef = useRef<Action | null>(null);

  const [state, dispatch] = useReducer<S, A>(reduce, initialArg, init);

  const { current: history } = historyRef;
  const devTools = useAutoMemo(
    process.env.NODE_ENV === 'development' &&
      window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__'].connect(devToolsConfig)
  );

  useAutoEffect(() => {
    if (devTools) {
      if (history === null) {
        historyRef.current = [];
        devTools.init(state);
      } else {
        for (const { action, state } of history.splice(0, Infinity)) {
          devTools.send(action, state);
        }
      }
    }
  });

  return [
    state,
    useAutoCallback((action: Action) => {
      if (historyRef.current) {
        historyRef.current.push({
          action,
          state: reduce(state, action),
        });
      }
      dispatch(action);
    }),
  ];
}
