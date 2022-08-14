import React from 'react'
import { CommonControlsProps } from '../../../types'
import CommonControls from './common-controls'

const PrimitiveControls: React.FC<CommonControlsProps> = ({ ...props }) => {
  return <CommonControls {...props} />
}

export default PrimitiveControls
