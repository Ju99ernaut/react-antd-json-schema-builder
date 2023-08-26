import {
  ArraySchemaFieldOption,
  ArrayValidSchemaField,
  BoolSchemaFieldOption,
  BoolValidSchemaField,
  CommonSchemaFieldOption,
  CommonValidSchemaField,
  CurrencySchemaFieldOption,
  CurrencyValidSchemaField,
  DateSchemaFieldOption,
  DateValidSchemaField,
  NumberSchemaFieldOption,
  NumberValidSchemaField,
  ObjectSchemaFieldOption,
  ObjectValidSchemaField,
  PercentSchemaFieldOption,
  PercentValidSchemaField,
  SchemaMenuOption,
  SchemaType,
  SchemaTypeOption,
  StringSchemaFieldOption,
  StringValidSchemaField,
} from '../types'

export const ROOT_KEY = '__root__'

export const schemaTypes: SchemaTypeOption[] = [
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  },
  {
    value: 'boolean',
    label: 'Boolean',
  },
  {
    value: 'currency',
    label: 'Currency',
  },
  {
    value: 'percent',
    label: 'Percent',
  },
  {
    value: 'date',
    label: 'Date',
  },
]

export const formatOptions = [
  {
    value: 'date-time',
    label: 'Date/Time',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'hostname',
    label: 'Hostname',
  },
  {
    value: 'ipv4',
    label: 'IPv4',
  },
  {
    value: 'ipv6',
    label: 'IPv6',
  },
  {
    value: 'uri',
    label: 'URI',
  },
]

const commonValidProperties: CommonValidSchemaField[] = [
  'id',
  'uuid',
  'description',
  'type',
  'title',
  'items',
]

export const stringValidSchemaProperties: StringValidSchemaField[] = [
  ...commonValidProperties,
  'enum',
  'format',
  'maxLength',
  'minLength',
  'pattern',
]

export const numberValidSchemaProperties: NumberValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
]

export const boolValidSchemaProperties: BoolValidSchemaField[] = [
  ...commonValidProperties,
]

export const arrayValidSchemaProperties: ArrayValidSchemaField[] = [
  ...commonValidProperties,
  'maxItems',
  'minItems',
  'uniqueItems',
  'items',
]

export const objectValidSchemaProperties: ObjectValidSchemaField[] = [
  ...commonValidProperties,
  'properties',
]

export const currencyValidSchemaProperties: CurrencyValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
]

export const percentValidSchemaProperties: PercentValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
]

export const dateValidSchemaProperties: DateValidSchemaField[] = [
  ...commonValidProperties,
]

const commonSchemaOptions: CommonSchemaFieldOption[] = [
  { value: 'description', label: 'Description', type: 'text' },
]

export const stringSchemaOptions: StringSchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minLength', label: 'Min Length', type: 'number' },
  { value: 'maxLength', label: 'Max Length', type: 'number' },
  { value: 'enum', label: 'Options', type: 'multi' },
  { value: 'pattern', label: 'Pattern', type: 'text' },
  {
    value: 'format',
    label: 'Format',
    type: 'select',
    optionList: formatOptions,
  },
]

export const numberSchemaOptions: NumberSchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minimum', label: 'Min Number', type: 'number' },
  { value: 'maximum', label: 'Max Number', type: 'number' },
]

export const boolSchemaOptions: BoolSchemaFieldOption[] = [
  ...commonSchemaOptions,
]

export const objectSchemaOptions: ObjectSchemaFieldOption[] = [
  ...commonSchemaOptions,
]

export const arraySchemaOptions: ArraySchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minItems', label: 'Min Items', type: 'number' },
  { value: 'maxItems', label: 'Max Items', type: 'number' },
  { value: 'uniqueItems', label: 'Unique Items', type: 'boolean' },
]

export const currencySchemaOptions: CurrencySchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minimum', label: 'Min Number', type: 'number' },
  { value: 'maximum', label: 'Max Number', type: 'number' },
]

export const percentSchemaOptions: PercentSchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minimum', label: 'Min Number', type: 'number' },
  { value: 'maximum', label: 'Max Number', type: 'number' },
]

export const dateSchemaOptions: DateSchemaFieldOption[] = [
  ...commonSchemaOptions,
]

export const typeToOptions: Record<SchemaType, SchemaMenuOption[]> = {
  string: stringSchemaOptions,
  number: numberSchemaOptions,
  boolean: boolSchemaOptions,
  array: arraySchemaOptions,
  object: objectSchemaOptions,
  percent: percentSchemaOptions,
  currency: currencySchemaOptions,
  date: dateSchemaOptions,
}

export const typeToValidFields: Record<SchemaType, string[]> = {
  string: stringValidSchemaProperties,
  number: numberValidSchemaProperties,
  boolean: boolValidSchemaProperties,
  object: objectValidSchemaProperties,
  array: arrayValidSchemaProperties,
  percent: percentValidSchemaProperties,
  currency: currencyValidSchemaProperties,
  date: dateValidSchemaProperties,
}
