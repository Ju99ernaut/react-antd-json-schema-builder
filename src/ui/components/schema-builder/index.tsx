import React from 'react'
import SchemaProvider from '../../../context/schema-context'
import { JSONSchemaEditor } from '../../../types'
import SchemaCreator from '../schema-creator'
import { Row, Col } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateSchema } from '../../../reducers/schema'
import { RootState } from '../../../store'

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

  const schemaInRedux = useSelector((state: RootState) => state.schema)
  const dispatch = useDispatch()

  dispatch(updateSchema(data))

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
        schema={schemaInRedux.present.schema}
        onChange={schema => {
          onChange(schema)
          dispatch(updateSchema(schema))
        }}
      />
    </SchemaProvider>
  )
}

export default SchemaBuilder
