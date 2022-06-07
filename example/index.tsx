import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { JSONSchemaBuilder } from '../.'

const App = () => {
  return (
    <div style={{ padding: 16 }}>
      <JSONSchemaBuilder />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
