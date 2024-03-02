import useDecodeSchema from 'hooks/useDecodeSchema'
import entries from 'lodash/entries'
import React, { useMemo } from 'react'
import { CommonSubObjectProps, Schema } from '../../../types'
import SchemaCreator from '../schema-creator'

const CommonSubObject = ({
  schema,
  onDelete,
  onChangeKey,
  onChange,
}: CommonSubObjectProps) => {
  const { schemaProperties } = useDecodeSchema(schema)
  const schemaEntries = useMemo(
    () => entries(schemaProperties),
    [schemaProperties]
  )

  return (
    <>
      {schemaEntries.map(([key, properties]) => {
        return (
          <SchemaCreator
            key={key}
            schema={properties as Schema}
            schemaKey={key}
            onDelete={onDelete}
            onChangeKey={newKey => onChangeKey(key, newKey)}
            onChange={newSchema => onChange(key, newSchema)}
          />
        )
      })}
    </>
  )
}

export default CommonSubObject
