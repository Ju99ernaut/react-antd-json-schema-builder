import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusSquareOutlined,
  // SettingOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Select, Typography, Tooltip } from 'antd'
import { isFunction } from 'lodash'
import React, { useState } from 'react'
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
  
  const doNothing = () => {}

  const [hover, setHover] = useState(false)

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
              <Col xs={10} xl={11}>
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
                    {isFunction(onChangeKey) && (
                      <Input
                        style={{ borderRadius: '0px', borderRight: '0px' }}
                        defaultValue={schemaKey}
                        disabled={rootNode || disabledInput}
                        onBlur={onChangeFieldName}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} xl={12}>
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
                  <Select.OptGroup key="complex" label="Complex">
                    {schemaTypes.slice(0, 3).map(({ value, label, description }, i) => {
                      return (
                        <Select.Option value={value} key={i}>
                          <div>
                            <Title level={5} style={{ fontSize: "15px" }}><Icon types={value} /> {label}</Title>
                            <Text style={{ paddingLeft: "10px" }}>{description}</Text>
                          </div>
                        </Select.Option>
                      )
                    })}
                  </Select.OptGroup>
                  <Select.OptGroup key="primitive" label="Primitive">
                    {schemaTypes.slice(3).map(({ value, label, description }, i) => {
                      return (
                        <Select.Option value={value} key={i + 2}>
                          <div>
                            <Title level={5} style={{ fontSize: "15px" }}><Icon types={value} /> {label}</Title>
                            <Text style={{ paddingLeft: "10px" }}>{description}</Text>
                          </div>
                        </Select.Option>
                      )
                    })}
                  </Select.OptGroup>
                </Select>
              </Col>
              {/*<Tooltip title='Field Settings'>
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
              </Tooltip>*/}
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
                  <Col xs={22} xl={23}>
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
                            color: 'black',
                            borderRadius: '3px',
                            ...(hover ? { borderColor: '#009BFF', color: '#009BFF', outline: '1px solid #29b0ff' } : {})
                          }}
                          onMouseEnter={() => setHover(true)} 
                          onMouseLeave={() => setHover(false)}
                          icon={<PlusSquareOutlined style={{ color: 'inherit' }} />}
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
