import { CommonSubObjectProps, Schema } from '@helpers/types'
import useControls from '@src/hooks/useControls'
import React from 'react'
import SchemaCreator from '../schema-creator'

const CommonSubObject = ({
  schema,
  onDelete,
  onChangeKey,
  onChange
}: CommonSubObjectProps) => {
  const { schemaEntries } = useControls({ schema })

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
