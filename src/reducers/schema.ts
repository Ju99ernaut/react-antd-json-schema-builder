import { createSlice } from '@reduxjs/toolkit'
import defaultSchema from 'helpers/default-schema'
import { Schema } from '../types/index'
import undoable from 'redux-undo'

const initialState: { schema: Schema } = {
  schema: defaultSchema,
}

export const schemaReducer = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    updateSchema: (state, action) => {
      state.schema = action.payload
    },
  },
})

export const { updateSchema } = schemaReducer.actions

export default undoable(schemaReducer.reducer)
