import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { DragDropContext } from 'react-dnd'
import notifActions from 'modules/notification'
import Migration from '../components/Migration'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
@firebaseConnect()
@connect(
  ({ firebase }) => ({

  }),
  { ...notifActions }
)
export default class MigrationContainer extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    showSuccess: PropTypes.func.isRequired
  }

  state = {
    selectedActions: []
  }

  migrationRequest = () => {
    return this.props.firebase.push('requests/migration',
      {
        databaseURL: 'https://xdotcom-ebce4.firebaseio.com/',
        copyPath: 'instances',
        serviceAccount: 'serviceAccounts/L7qNrKtd7Kaw6i85dnu4IcQXMYe2/-KqC7UG1_MGm1xgiZTIU/xdotcom-ddb4fe5e1ef0.json'
      })
      .then(() => {
        this.props.showSuccess('Request created successfully')
      })
  }

  actionDrop = (action) => {
    this.setState({ selectedActions: [...this.state.selectedActions, action] })
  }

  render() {
    return (
      <Migration
        onCreateClick={this.migrationRequest}
        actions={this.state.selectedActions}
        onActionDrop={this.actionDrop}
      />
    )
  }
}
