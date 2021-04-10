import { useReducer, useRef, useCallback, useMemo } from "react";

export default function useExtendedReducer(reducer, middleware = [], ...args) {
  const stateRef = useRef(null);
  const middlewareRef = useRef(middleware);

  const [state, rawDispatch] = useReducer((state, action) => {
    stateRef.current = reducer(state, action);
    return stateRef.current;
  }, ...args);

  const getState = useCallback(() => stateRef.current, [stateRef]);

  let finalDispatch = () => {};
  const storeAPI = useMemo(
    () => ({
      dispatch: () => finalDispatch(),
      getState
    }),
    []
  );

  finalDispatch = useMemo(
    () =>
      middlewareRef.current.reduceRight(
        (acc, mw) => mw(storeAPI)(acc),
        rawDispatch
      ),
    []
  );

  return [state, finalDispatch];
}
