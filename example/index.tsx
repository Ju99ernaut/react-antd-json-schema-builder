import 'antd/dist/antd.css'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { JSONSchemaBuilder } from '../.'

const App = () => {
  const [data, setData] = React.useState({
    type: 'object',
    id: 'root',
    properties: {
      address: {
        type: 'object',
        id: 'address',
        properties: {
          street: {
            type: 'string',
            id: 'street'
          },
          city: {
            type: 'string',
            id: 'city'
          },
          state: {
            type: 'string',
            id: 'state'
          }
        }
      },
      product_name: {
        type: 'array',
        id: 'product_name',
        items: {
          type: 'string'
        }
      },
      product_object: {
        type: 'array',
        id: 'product_object',
        items: {
          type: 'object',
          properties: {
            address: {
              id: 'address',
              type: 'string'
            }
          }
        }
      },
      product_items: {
        type: 'array',
        id: 'product_items',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      product_description: {
        type: 'string',
        id: 'product_description'
      },
      msrp: {
        type: 'string',
        id: 'msrp'
      }
    }
  })

  console.log({ data })

  return (
    <div style={{ padding: 16 }}>
      <JSONSchemaBuilder data={data} onChange={setData} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
