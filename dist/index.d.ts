type Schema = Record<string, unknown>;
type SchemaType = 'string' | 'number' | 'object' | 'collection' | 'array' | 'boolean' | 'currency' | 'percent' | 'date';
type SchemaTypeOption = {
    value: SchemaType;
    label: string;
    description: string;
};
type JSONSchemaEditor = {
    data: Schema;
    onChange: (...args: any[]) => void;
    initializeWithIds?: boolean;
};
type CommonSchemaField = 'description' | 'disabled';
type StringSchemaField = CommonSchemaField | 'enum' | 'minLength' | 'maxLength' | 'pattern' | 'format';
type NumberSchemaField = CommonSchemaField | 'minimum' | 'maximum' | 'step';
type ArraySchemaField = CommonSchemaField | 'uniqueItems' | 'minItems' | 'maxItems';
type CommonValidSchemaField = CommonSchemaField | 'title' | 'type' | 'id' | 'uuid' | 'items';
type StringValidSchemaField = StringSchemaField | CommonValidSchemaField;
type NumberValidSchemaField = NumberSchemaField | CommonValidSchemaField;
type BoolValidSchemaField = CommonSchemaField | CommonValidSchemaField;
type CurrencyValidSchemaField = NumberSchemaField | CommonValidSchemaField;
type PercentValidSchemaField = NumberSchemaField | CommonValidSchemaField;
type DateValidSchemaField = CommonSchemaField | CommonValidSchemaField;
type ArrayValidSchemaField = ArraySchemaField | CommonValidSchemaField | 'items';
type ObjectValidSchemaField = CommonSchemaField | CommonValidSchemaField | 'properties';
type SchemaFieldOptionType = 'text' | 'number' | 'boolean' | 'multi' | 'select';
type SchemaFieldOption = {
    label: string;
    type: SchemaFieldOptionType;
    optionList?: any;
};
type CommonSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
type StringSchemaFieldOption = SchemaFieldOption & {
    value: StringSchemaField;
};
type NumberSchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
type BoolSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
type ObjectSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
type ArraySchemaFieldOption = SchemaFieldOption & {
    value: ArraySchemaField;
};
type PercentSchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
type CurrencySchemaFieldOption = SchemaFieldOption & {
    value: NumberSchemaField;
};
type DateSchemaFieldOption = SchemaFieldOption & {
    value: CommonSchemaField;
};
type SchemaMenuOption = StringSchemaFieldOption | NumberSchemaFieldOption | BoolSchemaFieldOption | ObjectSchemaFieldOption | ArraySchemaFieldOption | PercentSchemaFieldOption | CurrencySchemaFieldOption | DateSchemaFieldOption;
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
type ArrayControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'collection' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};
type CommonControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
    schema: Schema;
    schemaKey: string;
    rootNode?: boolean;
    controlType: 'object' | 'collection' | 'array' | 'primitive';
    onAdd: () => void;
    onDelete: () => void;
    onChange: (schema: Schema) => void;
    onChangeKey: (key: string) => void;
};

export { ArrayControlsProps, ArraySchemaField, ArraySchemaFieldOption, ArrayValidSchemaField, BoolSchemaFieldOption, BoolValidSchemaField, CommonControlsProps, CommonSchemaField, CommonSchemaFieldOption, CommonSubArrayProps, CommonSubObjectProps, CommonValidSchemaField, CurrencySchemaFieldOption, CurrencyValidSchemaField, DateSchemaFieldOption, DateValidSchemaField, JSONSchemaEditor, NumberSchemaField, NumberSchemaFieldOption, NumberValidSchemaField, ObjectSchemaFieldOption, ObjectValidSchemaField, PercentSchemaFieldOption, PercentValidSchemaField, Schema, SchemaCreatorProps, SchemaFieldOption, SchemaFieldOptionType, SchemaMenuOption, SchemaOptionsProps, SchemaType, SchemaTypeOption, StringSchemaField, StringSchemaFieldOption, StringValidSchemaField };
