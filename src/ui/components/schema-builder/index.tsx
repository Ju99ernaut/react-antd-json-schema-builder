import React from 'react'
import SchemaProvider from '../../../context/schema-context'
import { JSONSchemaEditor } from '../../../types'
import SchemaCreator from '../schema-creator'
import { Row, Col } from 'antd'

const SchemaBuilder = ({
  data,
  onChange,
  dispatch,
  updateSchema,
}: JSONSchemaEditor) => {
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
    border-radius: 10px;
    padding: 0 0 0 16px;
  }

  .rsc-controls-child {
    margin: 6px 0;
  }
`

  return (
    <SchemaProvider>
      <style>{css}</style>
      <Row align="middle" style={{ padding: '16px' }}>
        <Col xs={10} xl={11}>
          <Row justify="space-around" align="middle">
            <Col span={2}></Col>
            <Col span={22}>Name</Col>
          </Row>
        </Col>
        <Col xs={10} xl={11}>
          Type
        </Col>
        <Col xs={2} xl={1}></Col>
        <Col xs={2} xl={1}></Col>
      </Row>
      <SchemaCreator
        schema={(data as any)?.present?.schema || data}
        onChange={schema => {
          onChange(schema)
          dispatch && updateSchema && dispatch(updateSchema(schema))
        }}
      />
    </SchemaProvider>
  )
}

export default SchemaBuilder
