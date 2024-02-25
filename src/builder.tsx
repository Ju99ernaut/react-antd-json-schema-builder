import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import JSONSchemaBuilder from './ui/components/schema-builder'
import { JSONSchemaEditor } from './types'
import UndoRedo from './ui/undo-redo'

const SchemaBuilder = ({ data, onChange }: JSONSchemaEditor) => {
  return (
    <Provider store={store}>
      <UndoRedo />
      <JSONSchemaBuilder data={data} onChange={onChange} />
    </Provider>
  )
}

export default SchemaBuilder
