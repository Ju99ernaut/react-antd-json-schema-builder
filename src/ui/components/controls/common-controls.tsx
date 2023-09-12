import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusSquareFilled,
  SettingOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Select, Typography, Tooltip } from 'antd'
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
import Icon from '../type-icons'

const { Title, Text } = Typography

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
  const doNothing = () => {}

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
              <Col xs={!isCollection ? 9 : 16} xl={!isCollection ? 10 : 20}>
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
                <Col xs={7} xl={10}>
                  <Select
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                      borderLeft: '0px',
                    }}
                    className="rsc-controls-control-select-box"
                    value={getTypeOptions}
                    disabled={rootNode}
                    onChange={onChangeFieldType}
                    filterOption={false}
                  >
                    {schemaTypes.map(({ value, label, description }) => {
                      return (
                        <Select.Option value={value} label={label}>
                          <div>
                            <Title level={5} style={{ fontSize: "15px" }}><Icon types={value} /> {label}</Title>
                            <Text style={{ paddingLeft: "10px" }}>{description}</Text>
                          </div>
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Col>
              )}
              <Tooltip title='Toggle field to object'>
                <Col xs={2} xl={1}>
                  <Button
                    type={isObject || objectToggle ? 'primary' : 'text'}
                    style={{ width: '100%' }}
                    onClick={toggleObject}
                    icon={
                      <AppstoreOutlined
                        style={{
                          color: isObject || objectToggle ? '#ffffff' : '#3182ce',
                        }}
                      />
                    }
                  />
                </Col>
              </Tooltip>
              <Tooltip title='Toggle field to list'>
                <Col xs={2} xl={1}>
                  <Button
                    type={isArray || arrayToggle ? 'primary' : 'text'}
                    style={{ width: '100%' }}
                    onClick={toggleArray}
                    icon={
                      <BarsOutlined
                        style={{
                          color: isArray || arrayToggle ? '#ffffff' : '#3182ce',
                        }}
                      />
                    }
                  />
                </Col>
              </Tooltip>
              <Tooltip title='Field Settings'>
                <Col xs={2} xl={1}>
                  <Button
                    type="text"
                    style={{ width: '100%' }}
                    onClick={!getTypeOptions ? doNothing : openModal}
                    icon={
                      <SettingOutlined style={!getTypeOptions ? { 
                          color: 'rgba(0, 0, 0, 0.25)',
                          cursor: 'not-allowed',
                        } : {
                          color: '#3182ce'
                        }} 
                      />
                    }
                  />
                </Col>
              </Tooltip>
              <Tooltip title='Delete'>
                <Col xs={2} xl={1}>
                  <Button
                    type="text"
                    style={{ width: '100%' }}
                    onClick={isParentArray() || rootNode ? doNothing : onDelete}
                    icon={
                      <DeleteOutlined 
                        style={isParentArray() || rootNode ? {
                          color: 'rgba(0, 0, 0, 0.25)',
                          cursor: 'not-allowed',
                        } : {
                          color: '#e53e3e'
                        }}
                      />
                    }
                  />
                </Col>
              </Tooltip>
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
                      <Col span={22}>
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
                      <Col span={1}></Col>
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
