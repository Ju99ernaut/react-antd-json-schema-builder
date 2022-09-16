import { Schema } from '../types';
declare const useUnsavedChanges: (data: Schema) => {
    isDirty: boolean;
    handleSetDirty: () => void;
    handleSetPristine: () => void;
};
export default useUnsavedChanges;
