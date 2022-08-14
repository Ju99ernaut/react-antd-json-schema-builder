import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import React from 'react'
import { JSONSchemaBuilder } from '../index'
import { EMPTY_STATE } from './test/data'

export default {
  title: 'Main',
  component: JSONSchemaBuilder,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as ComponentMeta<typeof JSONSchemaBuilder>

const Template: ComponentStory<typeof JSONSchemaBuilder> = args => {
  const [data, setData] = React.useState(EMPTY_STATE)

  console.log({ data })

  return <JSONSchemaBuilder {...args} data={data} onChange={setData} />
}

export const Main = Template.bind({})
