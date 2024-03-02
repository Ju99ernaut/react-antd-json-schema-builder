import React from 'react'
import JSONSchemaBuilder from './ui/components/schema-builder'
import { JSONSchemaEditor } from './types'
import './style.css'

const SchemaBuilder = ({
  data,
  onChange,
  undoRedo,
  dispatch,
  updateSchema,
}: JSONSchemaEditor) => {
  return (
    <>
      {undoRedo}
      <JSONSchemaBuilder
        data={data}
        onChange={onChange}
        dispatch={dispatch}
        updateSchema={updateSchema}
      />
    </>
  )
}

export default SchemaBuilder
