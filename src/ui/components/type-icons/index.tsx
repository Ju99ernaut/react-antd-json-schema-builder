import React from 'react'

import {
  BarsOutlined,
  CheckOutlined,
  NumberOutlined,
  PercentageOutlined,
  FontSizeOutlined,
  DollarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

const Icon: React.FC<{ types: string }> = ({ types, ...props }) => {
  switch (types) {
    case 'array':
      return <BarsOutlined {...props} />
    case 'boolean':
      return <CheckOutlined {...props} />
    case 'number':
      return <NumberOutlined {...props} />
    case 'percent':
      return <PercentageOutlined {...props} />
    case 'currency':
      return <DollarOutlined {...props} />
    case 'date':
      return <CalendarOutlined {...props} />
    case 'duration':
      return <ClockCircleOutlined {...props} />
    case 'object':
      return <AppstoreOutlined {...props} />
    default:
      return <FontSizeOutlined {...props} />
  }
}

export default Icon
