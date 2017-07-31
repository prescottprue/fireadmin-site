import React from 'react'
import PropTypes from 'prop-types'
import { size } from 'lodash'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import actions from 'modules/notification'
import classes from './Notifications.scss'

const closeIconStyle = { paddingTop: '5px', height: '30px' }

const NotificationsContainer = ({ notifications, dismissNotification }) => (
  <div>
    {
      size(notifications.allIds)
        ?
          notifications.allIds.map(id => (
            <Snackbar
              className={classes.container}
              contentStyle={{ color: 'white' }}
              bodyStyle={{ paddingRight: 0 }}
              key={id}
              open
              action={<CloseIcon color='white' style={closeIconStyle} />}
              onActionTouchTap={() => dismissNotification(id)}
              message={notifications.byId[id].message}
            />
          ))
        : null
    }
  </div>
)

NotificationsContainer.propTypes = {
  notifications: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired,
}

export default connect(
  ({ notifications }) => ({ notifications }),
  actions
)(NotificationsContainer)
