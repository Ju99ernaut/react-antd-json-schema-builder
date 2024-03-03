import React, { useState } from 'react'
import { Button } from 'antd'
import { isFunction } from 'lodash'

import type { BaseButtonProps } from 'antd/lib/button/button.d.ts'

interface Props extends BaseButtonProps {
  label?: string
  onAdd: () => void
}
const NewPropertyButton = (props: Props) => {
  const { onAdd, label = '+ Add Field', type = 'link', ...rest } = props
  const [hover, setHover] = useState(false)

  return (
    <Button
      {...rest}
      type={type}
      disabled={!isFunction(onAdd)}
      onClick={onAdd}
      className="new-property-btn"
      style={{
        borderRadius: '6px',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Button>
  )
}

export default NewPropertyButton
