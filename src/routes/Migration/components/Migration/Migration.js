import React from 'react'
import PropTypes from 'prop-types'
import ActionsBoard from '../ActionsBoard'
import ActionsPicker from '../ActionsPicker'
import classes from './Migration.scss'

export const Migration = ({ migration, actions, onActionDrop }) => (
  <div className={classes.container}>
    <div className={classes.sidebar}>
      <ActionsPicker />
    </div>
    <div className={classes.main}>
      <h2>Data Migration Actions</h2>
      <div className={classes.actionBoard}>
        <ActionsBoard
          actions={actions}
          onActionDrop={onActionDrop}
        />
      </div>
    </div>
  </div>
)

Migration.propTypes = {
  migration: PropTypes.object,
  actions: PropTypes.array,
  onActionDrop: PropTypes.func
}

export default Migration
