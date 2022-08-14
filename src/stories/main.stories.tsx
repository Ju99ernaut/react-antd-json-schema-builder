import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { JSONSchemaBuilder } from '../index'

export default {
  title: 'Main',
  component: JSONSchemaBuilder,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as ComponentMeta<typeof JSONSchemaBuilder>

const Template: ComponentStory<typeof JSONSchemaBuilder> = args => {
  const [data, setData] = React.useState({
    type: 'object',
    properties: {
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
        },
      },
      product_name: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      product_object: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            address: {
              type: 'string',
            },
          },
        },
      },
      product_items: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      product_description: {
        type: 'string',
      },
      msrp: {
        type: 'string',
      },
    },
  })

  return <JSONSchemaBuilder {...args} data={data} onChange={setData} />
}

export const Main = Template.bind({})
