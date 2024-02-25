import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { Button, Tooltip, Space } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'

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
  <Space id="schema-state-control">
    <Tooltip title="Undo">
      <Button
        title="Undo"
        icon={<UndoOutlined />}
        onClick={onUndo}
        disabled={!canUndo}
      />
    </Tooltip>
    <Tooltip title="Redo">
      <Button
        title="Redo"
        icon={<RedoOutlined />}
        onClick={onRedo}
        disabled={!canRedo}
      />
    </Tooltip>
  </Space>
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
