import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import { RootState, AppDispatch } from '../../store'

const UndoRedoUI = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => {}
  onRedo: () => {}
}) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
)

const mapStateToProps = (state: RootState) => ({
  canUndo: state.schema.past.length > 1,
  canRedo: state.schema.future.length > 0,
})

const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
}

const UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedoUI)

export default UndoRedo
