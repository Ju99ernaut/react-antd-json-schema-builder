import React from 'react'
import { CommonControlsProps } from '../../../types'
import CommonControls from './common-controls'

const ArrayControls: React.FC<CommonControlsProps> = ({ ...props }) => {
  return <CommonControls {...props} />
}

export default ArrayControls
