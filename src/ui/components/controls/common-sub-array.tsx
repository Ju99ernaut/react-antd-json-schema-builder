import React from 'react'
import { CommonSubArrayProps } from '../../../helpers/types'
import SchemaCreator from '../schema-creator'

const CommonSubArray = ({ schema, onChange }: CommonSubArrayProps) => {
  return (
    <SchemaCreator
      schema={schema}
      schemaKey="items"
      disabledInput
      onChange={onChange}
    />
  )
}

export default CommonSubArray
