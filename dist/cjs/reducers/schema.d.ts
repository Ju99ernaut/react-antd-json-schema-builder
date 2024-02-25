/// <reference types="redux-undo" />
import { Schema } from '../types/index';
export declare const schemaReducer: import("@reduxjs/toolkit").Slice<{
    schema: Schema;
}, {
    updateSchema: (state: {
        schema: {
            [x: string]: unknown;
        };
    }, action: {
        payload: any;
        type: string;
    }) => void;
}, "schema", "schema", import("@reduxjs/toolkit").SliceSelectors<{
    schema: Schema;
}>>;
export declare const updateSchema: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "schema/updateSchema">;
declare const _default: import("redux").Reducer<import("redux-undo").StateWithHistory<{
    schema: Schema;
}>, import("redux").UnknownAction, import("redux-undo").StateWithHistory<{
    schema: Schema;
}>>;
export default _default;
