import React from 'react'
import { JSONSchemaEditor } from '../../../helpers/types'
import SchemaCreator from '../schema-creator'

const SchemaBuilder = ({ data, onChange }: JSONSchemaEditor) => {
  const css = `
  .controls-control-box {
    padding-left: 20px;
  }
  
  .controls-control-box:not(:empty) {
    margin-top: 12px;
  }
  
  .controls-control-box:not(:empty) > span,
  .controls-control-box:not(:empty) > div {
    margin-top: 12px;
  }
  
  .controls-control-select-box .ant-select-selector {
    border-radius: 0!important;
  }
  
  `

  return (
    <>
      <style>{css}</style>
      <SchemaCreator schema={data} onChange={onChange} />
    </>
  )
}

export default SchemaBuilder
