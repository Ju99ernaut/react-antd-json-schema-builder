import noop from 'lodash/noop'
import React from 'react'
import { ROOT_KEY } from '../../../helpers/constants'
import { addSchemaProperty, isSchemaObject } from '../../../helpers/schema'
import useDecodeSchema from '../../../hooks/useDecodeSchema'
import { SchemaCreatorProps, SchemaType } from '../../../types'
import CollectionControls from '../controls/collection-controls'
import ArrayControls from '../controls/array-controls'
import ObjectControls from '../controls/object-controls'
import PrimitiveControls from '../controls/primitive-controls'

const typeToControl: Record<SchemaType | 'default', React.FC<any>> = {
  object: props => <ObjectControls controlType="object" {...props} />,
  collection: props => (
    <CollectionControls controlType="collection" {...props} />
  ),
  array: props => <ArrayControls controlType="array" {...props} />,
  string: props => <PrimitiveControls controlType="primitive" {...props} />,
  number: props => <PrimitiveControls controlType="primitive" {...props} />,
  boolean: props => <PrimitiveControls controlType="primitive" {...props} />,
  percent: props => <PrimitiveControls controlType="primitive" {...props} />,
  currency: props => <PrimitiveControls controlType="primitive" {...props} />,
  date: props => <PrimitiveControls controlType="primitive" {...props} />,
  default: props => <PrimitiveControls controlType="primitive" {...props} />,
}

const SchemaCreator: React.FC<SchemaCreatorProps> = ({
  schema,
  schemaKey = ROOT_KEY,
  disabledInput,
  onChange = noop,
  onDelete = noop,
  onChangeKey = noop,
}) => {
  const { schemaType } = useDecodeSchema(schema)

  const onAdd = isSchemaObject(schema)
    ? () => onChange(addSchemaProperty(schema))
    : undefined

  return typeToControl[schemaType || 'default']({
    schema,
    schemaKey,
    rootNode: schemaKey === ROOT_KEY,
    disabledInput,
    onDelete: () => onDelete(schemaKey),
    onAdd,
    onChangeKey,
    onChange,
  })
}

export default SchemaCreator
