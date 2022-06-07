import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { schemaTypes } from '@helpers/constants'
import {
  deleteSchemaProperty,
  getSchemaItems,
  renameSchemaProperty,
  setSchemaItems,
  setSchemaProperty
} from '@helpers/schema'
import { Schema } from '@helpers/types'
import useControls from '@src/hooks/useControls'
import { Button, Col, Input, Row, Select } from 'antd'
import isFunction from 'lodash/isFunction'
import React from 'react'
import SchemaOptions from '../schema-options'
import CommonSubArray from './common-sub-array'
import CommonSubObject from './common-sub-object'

export interface CommonControlsProps {
  schema: Schema
  schemaKey: string
  rootNode?: boolean
  controlType: 'object' | 'array' | 'primitive'
  onAdd: () => void
  onDelete: () => void
  onChange: (schema: Schema) => void
  onChangeKey: (key: string) => void
}

const CommonControls: React.FC<CommonControlsProps> = ({
  schema,
  schemaKey,
  rootNode,
  controlType,
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

  const isCollection = controlType !== 'primitive'
  const isObject = controlType === 'object'
  const isArray = controlType === 'array'

  return (
    <div>
      <Input.Group>
        <Row align="middle">
          <Col xs={isObject ? 9 : 10} xl={11}>
            <Row justify="space-around" align="middle">
              <Col span={2}>
                {isCollection && (
                  <Button
                    type="text"
                    onClick={handleShow}
                    style={{ width: '100%' }}
                    icon={show ? <CaretDownFilled /> : <CaretRightFilled />}
                  />
                )}
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
          <Col xs={isObject ? 9 : 10} xl={isObject ? 10 : 11}>
            <Select
              style={{ width: '100%', borderRadius: '0px' }}
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
          {isObject && (
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
      {isCollection && show && (
        <div className="controls-control-box">
          {isObject && (
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
          {isArray && (
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

export default CommonControls
