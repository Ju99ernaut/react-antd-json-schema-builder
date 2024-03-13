import React, { useMemo } from 'react'
import { Button, Tooltip } from 'antd'
import { isFunction } from 'lodash'
import { useSchemaContext } from '../../../context/schema-context'

import type { BaseButtonProps } from 'antd/lib/button/button.d.ts'

interface Props extends BaseButtonProps {
  label?: string
  onAdd: () => void
}
const NewPropertyButton = (props: Props) => {
  const { onAdd, label = '+ Add Field', type = 'link', ...rest } = props
  const { search } = useSchemaContext()
  const disabled = useMemo(() => !isFunction(onAdd) || !!search, [onAdd, search])

  const button = (
    <Button
      {...rest}
      type={type}
      disabled={disabled}
      onClick={onAdd}
      className="new-property-btn"
      style={{
        borderRadius: '6px',
      }}
    >
      {label}
    </Button>
  )

  return disabled ? (
    <Tooltip title="Clear Search" placement="bottom">
      {button}
    </Tooltip>
  ) : (
    button
  )
}

export default NewPropertyButton
