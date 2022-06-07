export type Schema = Record<string, unknown>

export type SchemaType = 'string' | 'number' | 'object' | 'array' | 'boolean'

export type SchemaTypeOption = { value: SchemaType; label: string }

export type JSONSchemaEditor = {
  data?: Schema
}

export type JSONSchemaVisual = JSONSchemaEditor

export type CommonSchemaField = 'description'

export type StringSchemaField =
  | CommonSchemaField
  | 'enum'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'format'

export type NumberSchemaField = CommonSchemaField | 'minimum' | 'maximum'

export type BoolSchemaField = CommonSchemaField

export type ObjectSchemaField = CommonSchemaField

export type ArraySchemaField =
  | CommonSchemaField
  | 'uniqueItems'
  | 'minItems'
  | 'maxItems'

export type SchemaFieldOptionType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'multi'
  | 'select'

export type CommonValidSchemaField = CommonSchemaField | 'title' | 'type'

export type StringValidSchemaField = StringSchemaField | CommonValidSchemaField

export type NumberValidSchemaField = NumberSchemaField | CommonValidSchemaField

export type BoolValidSchemaField = BoolSchemaField | CommonValidSchemaField

export type ArrayValidSchemaField =
  | ArraySchemaField
  | CommonValidSchemaField
  | 'items'

export type ObjectValidSchemaField =
  | ObjectSchemaField
  | CommonValidSchemaField
  | 'properties'

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
  value: BoolSchemaField
}

export type ObjectSchemaFieldOption = SchemaFieldOption & {
  value: ObjectSchemaField
}

export type ArraySchemaFieldOption = SchemaFieldOption & {
  value: ArraySchemaField
}

export type SchemaMenuOption =
  | StringSchemaFieldOption
  | NumberSchemaFieldOption
  | BoolSchemaFieldOption
  | ObjectSchemaFieldOption
  | ArraySchemaFieldOption

export interface SchemaCreatorProps {
  schema: Schema
  schemaKey?: string
  onChange?: (schema: Schema) => void
  onChangeKey?: (key: string) => void
  onDelete?: (key: string) => void
}

export interface SchemaOptionsProps {
  showModal: boolean
  onClose: () => void
  schema: Schema
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
