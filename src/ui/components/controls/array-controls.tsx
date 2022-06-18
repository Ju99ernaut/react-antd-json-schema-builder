import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'

import { Button, Col, Input, Row, Select } from 'antd'
import isFunction from 'lodash/isFunction'
import React from 'react'
import { schemaTypes } from '../../../helpers/constants'
import {
  deleteSchemaProperty,
  getSchemaItems,
  isSchemaArray,
  isSchemaObject,
  renameSchemaProperty,
  setSchemaItems,
  setSchemaProperty
} from '../../../helpers/schema'
import { Schema } from '../../../helpers/types'
import useControls from '../../../hooks/useControls'
import SchemaOptions from '../schema-options'
import CommonSubArray from './common-sub-array'
import CommonSubObject from './common-sub-object'

export interface ArrayControlsProps {
  schema: Schema
  schemaKey: string
  rootNode?: boolean
  controlType: 'object' | 'array' | 'primitive'
  onAdd: () => void
  onDelete: () => void
  onChange: (schema: Schema) => void
  onChangeKey: (key: string) => void
}

const ArrayControls: React.FC<ArrayControlsProps> = ({
  schema,
  schemaKey,
  rootNode,
  onAdd,
  onDelete,
  onChange,
  onChangeKey
}) => {
  const {
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType
  } = useControls({ schema, onChange, onChangeKey })

  return (
    <div>
      <Input.Group>
        <Row align="middle">
          <Col xs={10} xl={11}>
            <Row justify="space-around" align="middle">
              <Col span={2}>
                <Button
                  type="text"
                  onClick={handleShow}
                  style={{ width: '100%' }}
                  icon={show ? <CaretDownFilled /> : <CaretRightFilled />}
                />
              </Col>
              <Col span={22}>
                <Input
                  style={{ borderRadius: '0px', borderRight: '0px' }}
                  defaultValue={schemaKey}
                  /* TODO: figure out way to disable array items without explictly using items as disable control */
                  disabled={rootNode || schemaKey === 'items'}
                  onBlur={onChangeFieldName}
                />
              </Col>
            </Row>
          </Col>
          <Col
            xs={isSchemaObject(schema) ? 9 : 10}
            xl={isSchemaObject(schema) ? 10 : 11}
          >
            <Select
              style={{ width: '100%' }}
              className="controls-control-select-box"
              value={getTypeOptions}
              options={schemaTypes}
              disabled={rootNode}
              onChange={onChangeFieldType}
            />
          </Col>
          <Col xs={2} xl={1}>
            <Button
              type="text"
              style={{ width: '100%' }}
              onClick={openModal}
              icon={<SettingOutlined style={{ color: '#3182ce' }} />}
              disabled={!getTypeOptions}
            />
          </Col>
          {isSchemaObject(schema) && (
            <Col xs={2} xl={1}>
              <Button
                type="text"
                disabled={!isFunction(onAdd)}
                onClick={onAdd}
                style={{ width: '100%' }}
                icon={<PlusCircleOutlined style={{ color: '#38a169' }} />}
              />
            </Col>
          )}
          <Col xs={2} xl={1}>
            <Button
              type="text"
              style={{ width: '100%' }}
              onClick={onDelete}
              icon={<DeleteOutlined style={{ color: '#e53e3e' }} />}
              disabled={rootNode}
            />
          </Col>
        </Row>
      </Input.Group>
      <SchemaOptions
        {...{ showModal, onClose: closeModal, schema, onChange }}
      />
      {(isSchemaObject(schema) || isSchemaArray(schema)) && show && (
        <div className="controls-control-box">
          {isSchemaObject(schema) && (
            <CommonSubObject
              schema={schema}
              onDelete={key => onChange(deleteSchemaProperty(key)(schema))}
              onChange={(key, newSchema) =>
                onChange(setSchemaProperty(key)(newSchema, schema))
              }
              onChangeKey={(oldKey, newKey) =>
                onChange(renameSchemaProperty(oldKey, newKey, schema))
              }
            />
          )}
          {isSchemaArray(schema) && (
            <CommonSubArray
              schema={getSchemaItems(schema)}
              onChange={oldSchema =>
                onChange(setSchemaItems(oldSchema, schema))
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ArrayControls
