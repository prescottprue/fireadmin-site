import React from 'react'
import PropTypes from 'prop-types'
import classes from './Instances.scss'

export const Instances = ({ instances }) => (
  <div className={classes.container}>
    <pre>{JSON.stringify(instances, null, 2)}</pre>
  </div>
)

Instances.propTypes = {
  instances: PropTypes.object
}

export default Instances
