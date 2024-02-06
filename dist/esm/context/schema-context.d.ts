import React, { PropsWithChildren } from 'react';
export declare const SchemaContext: React.Context<{
    changes: string[];
    handlePushToChanges: (id: string) => void;
    handleGetIsInChanges: (id: string) => boolean;
    handleChangesIdKey: (oldKey: string, newKey: string) => void;
}>;
declare const SchemaProvider: ({ children }: PropsWithChildren) => React.JSX.Element;
export declare const useSchemaContext: () => {
    changes: string[];
    handlePushToChanges: (id: string) => void;
    handleGetIsInChanges: (id: string) => boolean;
    handleChangesIdKey: (oldKey: string, newKey: string) => void;
};
export default SchemaProvider;
