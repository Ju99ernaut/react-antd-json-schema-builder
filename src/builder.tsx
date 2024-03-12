import React from 'react'
import JSONSchemaBuilder from './ui/components/schema-builder'
import { JSONSchemaEditor } from './types'
import SchemaProvider from './context/schema-context'
import './style.css'

const SchemaBuilder = ({ data, onChange, undoRedo, dispatch, updateSchema }: JSONSchemaEditor) => {
  return (
    <SchemaProvider>
      <JSONSchemaBuilder
        data={data}
        undoRedo={undoRedo}
        onChange={onChange}
        dispatch={dispatch}
        updateSchema={updateSchema}
      />
    </SchemaProvider>
  )
}

export default SchemaBuilder
