import useControls from '../../../hooks/useControls'
import { CommonSubObjectProps, Schema } from '../../../types'
import SchemaCreator from '../schema-creator'

const CommonSubObject = ({
  schema,
  onDelete,
  onChangeKey,
  onChange,
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
