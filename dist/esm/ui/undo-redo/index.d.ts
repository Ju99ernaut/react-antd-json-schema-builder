import React from 'react';
declare const UndoRedo: import("react-redux").ConnectedComponent<({ canUndo, canRedo, onUndo, onRedo, }: {
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => {};
    onRedo: () => {};
}) => React.JSX.Element, {
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default UndoRedo;
