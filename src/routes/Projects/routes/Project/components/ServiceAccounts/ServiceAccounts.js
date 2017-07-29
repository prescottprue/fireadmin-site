import React from 'react'
import { map } from 'lodash'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import classes from './ServiceAccounts.scss'

export const ServiceAccounts = ({ serviceAccounts, onAccountClick }) => (
  <div className={classes.container}>
    {
      map(serviceAccounts, ({ name }, key) =>
        <Paper key={key} className={classes.account} onClick={onAccountClick}>
          {name}
        </Paper>
      )
    }
  </div>
)

ServiceAccounts.propTypes = {
  serviceAccounts: PropTypes.object,
  onAccountClick: PropTypes.func
}

export default ServiceAccounts
