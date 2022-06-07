import entries from 'lodash/entries'
import React, { useState } from 'react'
import { schemaTypes } from '../helpers/constants'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields
} from '../helpers/schema'
import { Schema } from '../helpers/types'
import useDecodeSchema from './useDecodeSchema'

interface UseControlProps {
  schema: Schema
  onChange?: any
  onChangeKey?: any
}

const useControls = ({ schema, onChange, onChangeKey }: UseControlProps) => {
  const [show, setShow] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { schemaType, schemaTitle, schemaProperties } = useDecodeSchema(schema)
  const schemaEntries = entries(schemaProperties)

  const handleShow = () => setShow(state => !state)

  const getTypeOptions = (findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown) as string

  const openModal = () => setShowModal(true)

  const closeModal = () => setShowModal(false)

  const onChangeFieldName = (event: React.FocusEvent<HTMLInputElement>) =>
    onChangeKey ? onChangeKey(event.target.value) : undefined

  const onChangeFieldType = (option: string) =>
    onChange(setSchemaTypeAndRemoveWrongFields(option, schema))

  return {
    schemaType,
    schemaTitle,
    schemaEntries,
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType
  }
}

export default useControls
