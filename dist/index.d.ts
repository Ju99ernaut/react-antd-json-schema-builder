declare type Schema = Record<string, unknown>;
declare type SchemaType = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'currency' | 'percent' | 'date';
declare type SchemaTypeOption = {
    value: SchemaType;
    label: string;
};
declare type JSONSchemaEditor = {
    data: Schema;
    onChange: (...args: any[]) => void;
    initializeWithIds?: boolean;
};
declare type CommonSchemaField = 'description';
declare type StringSchemaField = CommonSchemaField | 'enum' | 'minLength' | 'maxLength' | 'pattern' | 'format';
declare type NumberSchemaField = CommonSchemaField | 'minimum' | 'maximum';
declare type ArraySchemaField = CommonSchemaField | 'uniqueItems' | 'minItems' | 'maxItems';
declare type CommonValidSchemaField = CommonSchemaField | 'title' | 'type' | 'id' | 'uuid' | 'items';
declare type StringValidSchemaField = StringSchemaField | CommonValidSchemaField;
declare type NumberValidSchemaField = NumberSchemaField | CommonValidSchemaField;
declare type BoolValidSchemaField = CommonSchemaField | CommonValidSchemaField;
declare type CurrencyValidSchemaField = NumberSchemaField | CommonValidSchemaField;
declare type PercentValidSchemaField = NumberSchemaField | CommonValidSchemaField;
declare type DateValidSchemaField = CommonSchemaField | CommonValidSchemaField;
declare type ArrayValidSchemaField = ArraySchemaField | CommonValidSchemaField | 'items';
declare type ObjectValidSchemaField = CommonSchemaField | CommonValidSchemaField | 'properties';
declare type SchemaFieldOptionType = 'text' | 'number' | 'boolean' | 'multi' | 'select';
declare type SchemaFieldOption = {
    label: string;
    type: SchemaFieldOptionType;
    optionList?: any;
};
declare type CommonSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
declare type StringSchemaFieldOption = SchemaFieldOption & {
    value: StringSchemaField;
};
declare type NumberSchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
declare type BoolSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
declare type ObjectSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
declare type ArraySchemaFieldOption = SchemaFieldOption & {
    value: ArraySchemaField;
};
declare type PercentSchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
declare type CurrencySchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
declare type DateSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
declare type SchemaMenuOption = StringSchemaFieldOption | NumberSchemaFieldOption | BoolSchemaFieldOption | ObjectSchemaFieldOption | ArraySchemaFieldOption | PercentSchemaFieldOption | CurrencySchemaFieldOption | DateSchemaFieldOption;
interface SchemaCreatorProps {
    schema: Schema;
    schemaKey?: string;
    disabledInput?: boolean;
    onChange?: (schema: Schema) => void;
    onChangeKey?: (key: string) => void;
    onDelete?: (key: string) => void;
}
interface SchemaOptionsProps {
    showModal: boolean;
    onClose: () => void;
    schema: Schema;
    schemaKey: string;
    onChange: (schema: Schema) => void;
}
interface CommonSubArrayProps {
    schema: Schema;
    onChange: (schema: Schema) => void;
}
interface CommonSubObjectProps {
    schema: Schema;
    onDelete: (key: string) => void;
    onChangeKey: (oldKey: string, newKey: string) => void;
    onChange: (key: string, schema: Schema) => void;
}
declare type ArrayControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};
declare type CommonControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};

export { ArrayControlsProps, ArraySchemaField, ArraySchemaFieldOption, ArrayValidSchemaField, BoolSchemaFieldOption, BoolValidSchemaField, CommonControlsProps, CommonSchemaField, CommonSchemaFieldOption, CommonSubArrayProps, CommonSubObjectProps, CommonValidSchemaField, CurrencySchemaFieldOption, CurrencyValidSchemaField, DateSchemaFieldOption, DateValidSchemaField, JSONSchemaEditor, NumberSchemaField, NumberSchemaFieldOption, NumberValidSchemaField, ObjectSchemaFieldOption, ObjectValidSchemaField, PercentSchemaFieldOption, PercentValidSchemaField, Schema, SchemaCreatorProps, SchemaFieldOption, SchemaFieldOptionType, SchemaMenuOption, SchemaOptionsProps, SchemaType, SchemaTypeOption, StringSchemaField, StringSchemaFieldOption, StringValidSchemaField };
