import assign from 'lodash/fp/assign'
import entries from 'lodash/fp/entries'
import find from 'lodash/fp/find'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import isEmpty from 'lodash/fp/isEmpty'
import keys from 'lodash/fp/keys'
import map from 'lodash/fp/map'
import noop from 'lodash/fp/noop'
import pick from 'lodash/fp/pick'
import reduce from 'lodash/fp/reduce'
import set from 'lodash/fp/set'
import uniqueId from './unique'
import unset from 'lodash/fp/unset'
import { Schema, SchemaType } from '../types'
import { typeToOptions, typeToValidFields } from './constants'

export const returnUndefined = noop

export const getAllSchemaKeys = keys

export const getSchemaField = get

export const getSchemaFields = pick

export const getSchemaType = getSchemaField('type')

export const getSchemaTitle = getSchemaField('title')

export const getSchemaProperty = (key: string) =>
  getSchemaField(['properties', key])

export const getSchemaProperties = getSchemaField('properties')

export const getSchemaItems = getSchemaField('items')

export const setSchemaField = set

export const setSchemaType = setSchemaField('type')

export const setSchemaTitle = setSchemaField('title')

export const setSchemaId = setSchemaField('id')

export const setSchemaProperties = setSchemaField('properties')

export const setSchemaProperty = (key: string) =>
  setSchemaField(['properties', key])

export const setSchemaItems = setSchemaField('items')

export const deleteSchemaField = unset

export const deleteSchemaProperty = (key: string) =>
  deleteSchemaField(['properties', key])

export const addSchemaProperty = (schema: Schema) =>
  setSchemaProperty(uniqueId('field_', schema))({}, schema)

export const renameSchemaField = (oldKey: string, newKey: string) =>
  flow([
    entries,
    map(([k, v]) => ({
      [k === oldKey ? newKey : k]: {
        ...v,
        id: k === oldKey ? newKey : v.id,
      },
    })),
    reduce(assign, {}),
  ])

export const renameSchemaProperty = (
  oldKey: string,
  newKey: string,
  schema: Schema
) =>
  flow([
    getSchemaProperties,
    renameSchemaField(oldKey, newKey),
    p => setSchemaProperties(p, schema),
  ])(schema)

export const isSchemaObject = (schema: Schema) =>
  getSchemaType(schema) === 'object'

export const isSchemaArray = (schema: Schema) =>
  getSchemaType(schema) === 'array'

export const findOption = (value: string) => find(['value', value])

export const getValidFields = (type: SchemaType) => get(type, typeToValidFields)

export const removeWrongFields = (schema: Schema) => {
  const type = getSchemaType(schema)
  const fields = getValidFields(type)
  return getSchemaFields(fields, schema)
}

export const hasSchemaProperties = (schema: Schema) =>
  !isEmpty(getSchemaProperties(schema))

export const hasSchemaItems = (schema: Schema) =>
  !isEmpty(getSchemaItems(schema))

export const getSchemaMenuOptions = (type: SchemaType) =>
  get(type, typeToOptions)

export const setSchemaTypeAndRemoveWrongFields = flow([
  setSchemaType,
  removeWrongFields,
])

export const stringsToOptions = map(s => ({ label: s, value: s }))
