import React from 'react'
import PropTypes from 'prop-types'
import classes from './Migration.scss'

export const Migration = ({ migration }) => (
  <div className={classes.container}>
    <h1>Migration</h1>
    <div>
      <pre>{JSON.stringify(migration, null, 2)}</pre>
    </div>
  </div>
)

Migration.propTypes = {
  migration: PropTypes.object
}

export default Migration
