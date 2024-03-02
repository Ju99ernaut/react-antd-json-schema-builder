import React, { useState } from 'react'
import { Button } from 'antd'
import { isFunction } from 'lodash'

interface Props {
  onAdd: () => void
}
const NewPropertyButton = (props: Props) => {
  const { onAdd } = props
  const [hover, setHover] = useState(false)

  return (
    <Button
      type="link"
      disabled={!isFunction(onAdd)}
      onClick={onAdd}
      style={{
        // width: '100%',
        // backgroundColor: 'transparent',
        // borderColor: 'black',
        // color: 'black',
        borderRadius: '6px',
        ...(hover
          ? {
              borderColor: '#009BFF',
              color: '#009BFF',
              outline: '1px solid #29b0ff',
            }
          : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      + Add field
    </Button>
  )
}

export default NewPropertyButton
