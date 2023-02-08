import traverse from 'json-schema-traverse'
import { Schema } from '../types'
import { uuidv4 } from './unique'

const addIdsToSchema = (schema: Schema) => {
  traverse(
    schema,
    (
      schema: any,
      _parent: any,
      _root: any,
      _parentJSONParent: any,
      _parentKeyword: any,
      parentSchema: any,
      keyIndex: any
    ) => {
      if (!keyIndex) return

      parentSchema['properties'][keyIndex] = {
        uuid: schema.uuid ? schema.uuid : uuidv4(),
        id: keyIndex,
        ...schema,
      }
    }
  )

  return schema
}

export default addIdsToSchema
