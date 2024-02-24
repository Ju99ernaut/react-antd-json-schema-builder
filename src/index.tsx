import { Provider } from 'react-redux'
import { store } from './store'
import JSONSchemaBuilder from './ui/components/schema-builder'
import { JSONSchemaEditor } from './types'
import React from 'react'

const SchemaBuilder = ({ data, onChange }: JSONSchemaEditor) => {
  return (
    <Provider store={store}>
      <JSONSchemaBuilder data={data} onChange={onChange} />
    </Provider>
  )
}

export { default as addIdsToSchema } from './helpers/add-ids-to-schema'
export { default as defaultSchema } from './helpers/default-schema'
export { default as useUnsavedChanges } from './hooks/useUnsavedChanges'
export { SchemaBuilder as JSONSchemaBuilder }
