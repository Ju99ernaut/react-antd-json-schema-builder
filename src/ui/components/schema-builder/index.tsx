import React, { useState } from 'react'
import { defaultSchema } from '../../../helpers/constants'
import { JSONSchemaEditor, Schema } from '../../../helpers/types'
import SchemaCreator from '../schema-creator'

const SchemaBuilder = ({ data }: JSONSchemaEditor) => {
  const initial = data || defaultSchema
  const [schema, setSchema] = useState<Schema>(initial)

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
  
  .controls-control-select-box
    .my-select-container
    .ant-select
    .ant-select-selector {
    border-radius: 0;
  }
  
  `

  return (
    <>
      <style>{css}</style>
      <SchemaCreator schema={schema} onChange={setSchema} />
    </>
  )
}

export default SchemaBuilder
