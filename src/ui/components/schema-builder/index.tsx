import React from 'react'
import SchemaProvider from '../../../context/schema-context'
import { JSONSchemaEditor } from '../../../types'
import SchemaCreator from '../schema-creator'

const SchemaBuilder = ({ data, onChange }: JSONSchemaEditor) => {
  const css = `
  .rsc-controls-root {}

  .rsc-controls-root > div.rsc-controls-control-box {
    padding: 16px;
    margin: 0;
    border: none;
    background-color: none;
  }

  .rsc-controls-control-box {
    margin: 6px 0;
    border: solid 1px rgba(0, 0, 0, 0.07);
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    padding: 16px 0 16px 16px;
  }

  .rsc-controls-child {
    margin: 6px 0;
  }
  
  .rsc-controls-control-select-box .ant-select-selector {
    border-radius: 0!important;
  }
`

  return (
    <SchemaProvider>
      <style>{css}</style>
      <SchemaCreator schema={data} onChange={onChange} />
    </SchemaProvider>
  )
}

export default SchemaBuilder
