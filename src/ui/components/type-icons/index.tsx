import React, { HTMLAttributes } from 'react'

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
  GroupOutlined,
} from '@ant-design/icons'

interface ITypeIcon extends HTMLAttributes<HTMLSpanElement> {
  types: string
}

const Icon: React.FC<ITypeIcon> = ({ types, ...props }) => {
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
    case 'collection':
      return <GroupOutlined {...props} />
    default:
      return <FontSizeOutlined {...props} />
  }
}

export default Icon
