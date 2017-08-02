import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from 'lodash'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import MappingIcon from 'material-ui/svg-icons/action/code'
import classes from './ActionsPicker.scss'
import ActionCard from '../ActionCard'


const actionsOptions = [
  { label: 'Map', type: 'map', color: 'blue', icon:  <MappingIcon /> },
  { label: 'Copy', type: 'copy', color: 'yellow', icon: <CopyIcon /> },
  { label: 'Remove', type: 'remove', color: 'red', icon: <DeleteIcon /> }
]

export const ActionsPicker = ({ actionsPicker }) => (
  <div className={classes.container}>
    <div className='flex-column-center'>
      <h2>Actions</h2>
      {
        actionsOptions.map((opt, i) =>
          <ActionCard
            key={`ActionOption-${i}`}
            label={opt.label || capitalize(opt.type)}
            type={opt.type}
            icon={opt.icon}
          />
        )
      }
    </div>
  </div>
)

ActionsPicker.propTypes = {
  actionsPicker: PropTypes.object
}

export default ActionsPicker
