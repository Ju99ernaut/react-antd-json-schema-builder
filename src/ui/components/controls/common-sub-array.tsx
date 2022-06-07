import { CommonSubArrayProps } from '@helpers/types'
import React from 'react'
import SchemaCreator from '../schema-creator'

const CommonSubArray = ({ schema, onChange }: CommonSubArrayProps) => {
  return <SchemaCreator schema={schema} schemaKey="items" onChange={onChange} />
}

export default CommonSubArray
