/// <reference types="redux-undo" />
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    schema: import("redux-undo").StateWithHistory<{
        schema: import("./types").Schema;
    }>;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        schema: import("redux-undo").StateWithHistory<{
            schema: import("./types").Schema;
        }>;
    }, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
