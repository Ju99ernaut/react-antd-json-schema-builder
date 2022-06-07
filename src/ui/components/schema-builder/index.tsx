import { defaultSchema } from '@helpers/constants'
import { JSONSchemaEditor, Schema } from '@helpers/types'
import React, { useState } from 'react'
import SchemaCreator from '../schema-creator'

const SchemaBuilder: React.FC<JSONSchemaEditor> = ({ data }) => {
  const initial = data || defaultSchema
  const [schema, setSchema] = useState<Schema>(initial)

  return <SchemaCreator schema={schema} onChange={setSchema} />
}

export default SchemaBuilder
