import React, { useState, useCallback } from 'react'
import { useSchemaContext } from '../context/schema-context'
import { schemaTypes } from '../helpers/constants'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields,
  setSchemaTypeAndSetItemsAndRemoveWrongFields,
} from '../helpers/schema'
import { Schema } from '../types'
import useDecodeSchema from './useDecodeSchema'

interface UseControlProps {
  schema: Schema
  schemaKey?: string
  onChange?: any
  onChangeKey?: any
  rootNode?: boolean
}

const collectionTypes = ['object', 'array', 'collection']

const useControls = ({
  schema,
  schemaKey = '',
  onChange,
  onChangeKey,
  rootNode,
}: UseControlProps) => {
  const { handlePushToChanges, handleChangesIdKey, handleGetIsInChanges } =
    useSchemaContext()
  const autoExpand = handleGetIsInChanges(schemaKey)
  const [show, setShow] = useState(rootNode || autoExpand)
  const [showModal, setShowModal] = useState(false)
  const { schemaType } = useDecodeSchema(schema)

  const handleShow = useCallback(() => setShow(state => !state), [setShow])

  const getTypeOptions = findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown as string

  const openModal = useCallback(() => setShowModal(true), [setShowModal])

  const closeModal = useCallback(() => setShowModal(false), [setShowModal])

  const onChangeFieldName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handlePushToChanges(schemaKey)
      handleChangesIdKey(schemaKey, event.target.value)
      onChangeKey(event.target.value)
    },
    [handlePushToChanges, handleChangesIdKey, onChangeKey, schemaKey]
  )

  const onChangeFieldType = useCallback(
    (option: string) => {
      collectionTypes.includes(option) && handlePushToChanges(schemaKey)
      option === 'array' &&
        onChange(setSchemaTypeAndSetItemsAndRemoveWrongFields(option, schema))
      option !== 'array' &&
        onChange(setSchemaTypeAndRemoveWrongFields(option, schema))
    },
    [handlePushToChanges, onChange, schema, schemaKey]
  )

  const isParentArray = () => schemaKey === 'items'

  return {
    schemaType,
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
    isParentArray,
  }
}

export default useControls
