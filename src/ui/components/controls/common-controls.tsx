import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusSquareFilled,
  SettingOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Select } from 'antd'
import { isFunction } from 'lodash'
import React, { useState, useRef, useEffect } from 'react'
import { schemaTypes } from '../../../helpers/constants'
import {
  deleteSchemaProperty,
  getSchemaItems,
  renameSchemaProperty,
  setSchemaItems,
  setSchemaProperty,
} from '../../../helpers/schema'
import useControls from '../../../hooks/useControls'
import { CommonControlsProps } from '../../../types'
import SchemaOptions from '../schema-options'
import CommonSubArray from './common-sub-array'
import CommonSubObject from './common-sub-object'

const CommonControls: React.FC<CommonControlsProps> = ({
  schema,
  schemaKey,
  rootNode,
  controlType,
  disabledInput,
  onAdd,
  onDelete,
  onChange,
  onChangeKey,
}) => {
  const {
    getTypeOptions,
    show,
    showModal,
    schemaType,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
    isParentArray,
  } = useControls({ schema, schemaKey, rootNode, onChange, onChangeKey })

  const isCollection = controlType !== 'primitive'
  const isObject = controlType === 'object'
  const isArray = controlType === 'array'

  const [arrayToggle, setArrayToggle] = useState(isArray)
  const [objectToggle, setObjectToggle] = useState(isObject)
  const didMount = useRef(false)
  const toggleArray = () => {
    !arrayToggle && setObjectToggle(arrayToggle)
    setArrayToggle(!arrayToggle)
  }
  const toggleObject = () => {
    !objectToggle && setArrayToggle(objectToggle)
    setObjectToggle(!objectToggle)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    onChangeFieldType(
      arrayToggle ? 'array' : objectToggle ? 'object' : 'string'
    )
  }, [arrayToggle, objectToggle])

  return (
    <div
      data-schema-type={schemaType}
      data-schema-title={schemaKey}
      data-schema-id={schemaKey}
      className={rootNode ? 'rsc-controls-root' : 'rsc-controls-child'}
      {...(rootNode && {
        'data-root-node': rootNode,
      })}
    >
      {!rootNode && (
        <>
          <Input.Group>
            <Row align="middle">
              <Col xs={!isCollection ? 10 : 16} xl={!isCollection ? 10 : 20}>
                <Row justify="space-around" align="middle">
                  <Col span={!isCollection ? 2 : 1}>
                    {isCollection && (
                      <Button
                        type="text"
                        onClick={handleShow}
                        style={{ width: '100%' }}
                        icon={show ? <CaretDownFilled /> : <CaretRightFilled />}
                      />
                    )}
                  </Col>
                  <Col span={!isCollection ? 22 : 23}>
                    {isFunction(onChangeKey) && (
                      <Input
                        style={{ borderRadius: '0px' }}
                        defaultValue={schemaKey}
                        disabled={rootNode || disabledInput}
                        onBlur={onChangeFieldName}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              {!isCollection && (
                <Col xs={6} xl={10}>
                  <Select
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                      borderLeft: '0px',
                    }}
                    className="rsc-controls-control-select-box"
                    value={getTypeOptions}
                    options={schemaTypes}
                    disabled={rootNode}
                    onChange={onChangeFieldType}
                    filterOption={false}
                  />
                </Col>
              )}
              <Col xs={2} xl={1}>
                <Button
                  type={isObject || objectToggle ? 'primary' : 'text'}
                  style={{ width: '100%' }}
                  onClick={toggleObject}
                  title='Toggle Object'
                  icon={
                    <ContainerOutlined
                      style={{
                        color: isObject || objectToggle ? '#ffffff' : '#3182ce',
                      }}
                    />
                  }
                />
              </Col>
              <Col xs={2} xl={1}>
                <Button
                  type={isArray || arrayToggle ? 'primary' : 'text'}
                  style={{ width: '100%' }}
                  onClick={toggleArray}
                  title='Toggle Array'
                  icon={
                    <UnorderedListOutlined
                      style={{
                        color: isArray || arrayToggle ? '#ffffff' : '#3182ce',
                      }}
                    />
                  }
                />
              </Col>
              <Col xs={2} xl={1}>
                <Button
                  type="text"
                  style={{ width: '100%' }}
                  onClick={openModal}
                  icon={
                    <SettingOutlined style={{ 
                        color: !getTypeOptions ? 'rgba(0, 0, 0, 0.25)' : '#3182ce'
                      }} 
                    />
                  }
                  disabled={!getTypeOptions}
                />
              </Col>
              <Col xs={2} xl={1}>
                <Button
                  type="text"
                  style={{ width: '100%' }}
                  onClick={onDelete}
                  icon={
                    <DeleteOutlined 
                      style={{
                        color: isParentArray() || rootNode ? 'rgba(0, 0, 0, 0.25)' : '#e53e3e'
                      }}
                    />
                  }
                  disabled={isParentArray() || rootNode}
                />
              </Col>
            </Row>
          </Input.Group>
          <SchemaOptions
            showModal={showModal}
            onClose={closeModal}
            schema={schema}
            schemaKey={schemaKey}
            onChange={onChange}
          />
        </>
      )}
      {isCollection && show && (
        <div className="rsc-controls-control-box">
          {isObject && (
            <>
              <CommonSubObject
                schema={schema}
                onDelete={key => onChange(deleteSchemaProperty(key)(schema))}
                onChange={(key, newSchema) =>
                  onChange(setSchemaProperty(key)(newSchema, schema))
                }
                onChangeKey={(oldKey, newKey) => {
                  onChange(renameSchemaProperty(oldKey, newKey, schema))
                }}
              />
              <div className="rsc-controls-add-button">
                <Row>
                  <Col xs={18} xl={21}>
                    <Row>
                      <Col span={1}></Col>
                      <Col span={23}>
                        <Button
                          type="dashed"
                          disabled={!isFunction(onAdd)}
                          onClick={onAdd}
                          style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            borderColor: 'black',
                            borderRadius: '3px',
                          }}
                          icon={<PlusSquareFilled style={{ color: 'black' }} />}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </>
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
