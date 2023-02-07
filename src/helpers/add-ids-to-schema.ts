import traverse from 'json-schema-traverse'
import { Schema } from '../types'
import { uuidv4 } from './unique'

const addIdsToSchema = (schema: Schema) => {
  const newSchema = { ...schema } as Record<string, any>

  traverse(
    schema,
    (
      schema: any,
      _parent: any,
      _root: any,
      _parentJSONParent: any,
      _parentKeyword: any,
      _parentSchema: any,
      keyIndex: any
    ) => {
      if (!keyIndex) return

      newSchema['properties'][keyIndex] = {
        cid: schema.cid ? schema.cid : uuidv4(),
        id: keyIndex,
        ...schema,
      }
    }
  )

  return newSchema
}

export default addIdsToSchema
