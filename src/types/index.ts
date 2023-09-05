export type Schema = Record<string, unknown>

export type SchemaType =
  | 'string'
  | 'number'
  | 'object'
  | 'array'
  | 'boolean'
  | 'currency'
  | 'percent'
  | 'date'

export type SchemaTypeOption = { value: SchemaType; label: string }

export type JSONSchemaEditor = {
  data: Schema
  onChange: (...args: any[]) => void
  initializeWithIds?: boolean
}

export type CommonSchemaField = 'description'

export type StringSchemaField =
  | CommonSchemaField
  | 'enum'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'format'

export type NumberSchemaField = CommonSchemaField | 'minimum' | 'maximum' | 'step'

export type ArraySchemaField =
  | CommonSchemaField
  | 'uniqueItems'
  | 'minItems'
  | 'maxItems'

export type CommonValidSchemaField = CommonSchemaField | 'title' | 'type' | 'id' | 'uuid' | 'items'

export type StringValidSchemaField = StringSchemaField | CommonValidSchemaField

export type NumberValidSchemaField = NumberSchemaField | CommonValidSchemaField

export type BoolValidSchemaField = CommonSchemaField | CommonValidSchemaField

export type CurrencyValidSchemaField =
  | NumberSchemaField
  | CommonValidSchemaField

export type PercentValidSchemaField = NumberSchemaField | CommonValidSchemaField

export type DateValidSchemaField = CommonSchemaField | CommonValidSchemaField

export type ArrayValidSchemaField =
  | ArraySchemaField
  | CommonValidSchemaField
  | 'items'

export type ObjectValidSchemaField =
  | CommonSchemaField
  | CommonValidSchemaField
  | 'properties'

export type SchemaFieldOptionType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'multi'
  | 'select'

export type SchemaFieldOption = {
  label: string
  type: SchemaFieldOptionType
  optionList?: any
}

export type CommonSchemaFieldOption = SchemaFieldOption & {
  value: CommonSchemaField
}

export type StringSchemaFieldOption = SchemaFieldOption & {
  value: StringSchemaField
}

export type NumberSchemaFieldOption = SchemaFieldOption & {
  value: NumberSchemaField
}

export type BoolSchemaFieldOption = SchemaFieldOption & {
  value: CommonSchemaField
}

export type ObjectSchemaFieldOption = SchemaFieldOption & {
  value: CommonSchemaField
}

export type ArraySchemaFieldOption = SchemaFieldOption & {
  value: ArraySchemaField
}

export type PercentSchemaFieldOption = SchemaFieldOption & {
  value: NumberSchemaField
}

export type CurrencySchemaFieldOption = SchemaFieldOption & {
  value: NumberSchemaField
}

export type DateSchemaFieldOption = SchemaFieldOption & {
  value: CommonSchemaField
}

export type SchemaMenuOption =
  | StringSchemaFieldOption
  | NumberSchemaFieldOption
  | BoolSchemaFieldOption
  | ObjectSchemaFieldOption
  | ArraySchemaFieldOption
  | PercentSchemaFieldOption
  | CurrencySchemaFieldOption
  | DateSchemaFieldOption

export interface SchemaCreatorProps {
  schema: Schema
  schemaKey?: string
  disabledInput?: boolean
  onChange?: (schema: Schema) => void
  onChangeKey?: (key: string) => void
  onDelete?: (key: string) => void
}

export interface SchemaOptionsProps {
  showModal: boolean
  onClose: () => void
  schema: Schema
  schemaKey: string
  onChange: (schema: Schema) => void
}

export interface CommonSubArrayProps {
  schema: Schema
  onChange: (schema: Schema) => void
}

export interface CommonSubObjectProps {
  schema: Schema
  onDelete: (key: string) => void
  onChangeKey: (oldKey: string, newKey: string) => void
  onChange: (key: string, schema: Schema) => void
}

export type ArrayControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
  schema: Schema
  schemaKey: string
  rootNode?: boolean
  controlType: 'object' | 'array' | 'primitive'
  onAdd: () => void
  onDelete: () => void
  onChange: (schema: Schema) => void
  onChangeKey: (key: string) => void
}

export type CommonControlsProps = Pick<SchemaCreatorProps, 'disabledInput'> & {
  schema: Schema
  schemaKey: string
  rootNode?: boolean
  controlType: 'object' | 'array' | 'primitive'
  onAdd: () => void
  onDelete: () => void
  onChange: (schema: Schema) => void
  onChangeKey: (key: string) => void
}
