import {
  getSchemaProperties,
  getSchemaTitle,
  getSchemaType
} from '@helpers/schema'
import { Schema, SchemaType } from '@helpers/types'
import { useMemo } from 'react'

interface UseDecodeSchemaReturn {
  schemaTitle: string
  schemaType: SchemaType
  schemaProperties: Object
}

const useDecodeSchema = (schema: Schema): UseDecodeSchemaReturn => {
  const schemaType = useMemo(() => getSchemaType(schema), [schema])
  const schemaTitle = useMemo(() => getSchemaTitle(schema), [schema])
  const schemaProperties = useMemo(() => getSchemaProperties(schema), [schema])

  return {
    schemaType,
    schemaTitle,
    schemaProperties
  }
}

export default useDecodeSchema
