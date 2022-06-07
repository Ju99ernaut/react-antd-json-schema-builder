import React from 'react'
import { CommonControlsProps } from '../../../helpers/types'
import CommonControls from './common-controls'

const ObjectControls: React.FC<CommonControlsProps> = ({ ...props }) => {
  return <CommonControls {...props} />
}

export default ObjectControls
