export declare type Schema = Record<string, unknown>;
export declare type SchemaType = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'currency' | 'percent' | 'date';
export declare type SchemaTypeOption = {
    value: SchemaType;
    label: string;
};
export declare type JSONSchemaEditor = {
    data: Schema;
    onChange: (...args: any[]) => void;
    initializeWithIds?: boolean;
};
export declare type CommonSchemaField = 'description';
export declare type StringSchemaField = CommonSchemaField | 'enum' | 'minLength' | 'maxLength' | 'pattern' | 'format';
export declare type NumberSchemaField = CommonSchemaField | 'minimum' | 'maximum';
export declare type ArraySchemaField = CommonSchemaField | 'uniqueItems' | 'minItems' | 'maxItems';
export declare type CommonValidSchemaField = CommonSchemaField | 'title' | 'type';
export declare type StringValidSchemaField = StringSchemaField | CommonValidSchemaField;
export declare type NumberValidSchemaField = NumberSchemaField | CommonValidSchemaField;
export declare type BoolValidSchemaField = CommonSchemaField | CommonValidSchemaField;
export declare type CurrencyValidSchemaField = CommonSchemaField | CommonValidSchemaField;
export declare type PercentValidSchemaField = CommonSchemaField | CommonValidSchemaField;
export declare type DateValidSchemaField = CommonSchemaField | CommonValidSchemaField;
export declare type ArrayValidSchemaField = ArraySchemaField | CommonValidSchemaField | 'items';
export declare type ObjectValidSchemaField = CommonSchemaField | CommonValidSchemaField | 'properties';
export declare type SchemaFieldOptionType = 'text' | 'number' | 'boolean' | 'multi' | 'select';
export declare type SchemaFieldOption = {
    label: string;
    type: SchemaFieldOptionType;
    optionList?: any;
};
export declare type CommonSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type StringSchemaFieldOption = SchemaFieldOption & {
    value: StringSchemaField;
};
export declare type NumberSchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
export declare type BoolSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type ObjectSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type ArraySchemaFieldOption = SchemaFieldOption & {
    value: ArraySchemaField;
};
export declare type PercentSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type CurrencySchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type DateSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
export declare type SchemaMenuOption = StringSchemaFieldOption | NumberSchemaFieldOption | BoolSchemaFieldOption | ObjectSchemaFieldOption | ArraySchemaFieldOption | PercentSchemaFieldOption | CurrencySchemaFieldOption | DateSchemaFieldOption;
export interface SchemaCreatorProps {
    schema: Schema;
    schemaKey?: string;
    disabledInput?: boolean;
    onChange?: (schema: Schema) => void;
    onChangeKey?: (key: string) => void;
    onDelete?: (key: string) => void;
}
export interface SchemaOptionsProps {
    showModal: boolean;
    onClose: () => void;
    schema: Schema;
    schemaKey: string;
    onChange: (schema: Schema) => void;
}
export interface CommonSubArrayProps {
    schema: Schema;
    onChange: (schema: Schema) => void;
}
export interface CommonSubObjectProps {
    schema: Schema;
    onDelete: (key: string) => void;
    onChangeKey: (oldKey: string, newKey: string) => void;
    onChange: (key: string, schema: Schema) => void;
}
export declare type ArrayControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};
export declare type CommonControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};
