import React from 'react';
import { Schema } from '../types';
interface UseControlProps {
    schema: Schema;
    schemaKey?: string;
    onChange?: any;
    onChangeKey?: any;
    rootNode?: boolean;
}
declare const useControls: ({ schema, schemaKey, onChange, onChangeKey, rootNode, }: UseControlProps) => {
    schemaType: import("../types").SchemaType;
    getTypeOptions: string;
    show: boolean;
    showModal: boolean;
    openModal: () => void;
    closeModal: () => void;
    handleShow: () => void;
    onChangeFieldName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeFieldType: (option: string) => void;
    isParentArray: () => boolean;
};
export default useControls;
