import 'antd/dist/antd.css'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { JSONSchemaBuilder } from '../.'

const App = () => {
  const [data, setData] = React.useState({
    type: 'object',
    properties: {
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          state: {
            type: 'string'
          },
          zip: {
            type: 'string'
          }
        }
      },
      product_name: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      product_object: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            address: {
              type: 'string'
            }
          }
        }
      },
      product_items: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      product_description: {
        type: 'string'
      },
      msrp: {
        type: 'string'
      }
    }
  })

  return (
    <div style={{ padding: 16 }}>
      <JSONSchemaBuilder data={data} onChange={setData} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
