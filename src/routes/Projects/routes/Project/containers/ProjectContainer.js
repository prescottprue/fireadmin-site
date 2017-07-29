import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import Instances from 'routes/Projects/routes/Project/components/Instances'
import NewInstanceDialog from 'routes/Projects/routes/Project/components/NewInstanceDialog'
import classes from './ProjectContainer.scss'

// Get project path from firebase based on params prop (route params)
@UserIsAuthenticated
@firebaseConnect(({ params, auth }) => ([
  `projects/${params.projectId}`,
  `serviceAccounts/${auth.uid}/${params.projectId}`
]))
@connect(({ firebase }, { params, auth }) => ({
  project: dataToJS(firebase, `projects/${params.projectId}`),
  serviceAccounts: dataToJS(firebase, `serviceAccounts/${auth.uid}/${params.projectId}`),
}))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.shape({
      name: PropTypes.string
    }),
    serviceAccounts: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired,
      uploadFiles: PropTypes.func.isRequired
    }),
    params: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      projectId: PropTypes.string.isRequired
    })
  }

  state = {
    addInstanceOpen: false
  }

  addInstance = (instanceData) => {
    // console.log('add instance called', instanceData) // eslint-disable-line
    return this.props.firebase.push('instances', instanceData)
  }

  filesDrop = (files) => {
    // console.log('files', files) // eslint-disable-line
    const { auth: { uid }, params: { projectId }, firebase } = this.props
    return firebase.uploadFiles(`serviceAccounts/${uid}/${projectId}`, files, `serviceAccounts/${uid}/${projectId}`)
      .then((snap) => {
        return this.setState({ files })
      })
  }

  render () {
    const { project } = this.props

    if (!isLoaded(project)) {
      return <LoadingSpinner />
    }

    if (isEmpty(project)) {
      return (
        <div>
          Project not found
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <h2>{project.name}</h2>
          <RaisedButton
            label='Add Instance'
            onTouchTap={() => this.setState({ addInstanceOpen: true })}
          />
          <div>
            <h4>Instances</h4>
            {
              project.instances
              ?
                <Instances
                  instances={project.instances}
                />
              :
                <span>No Instances</span>
            }
          </div>
        </Paper>
        <NewInstanceDialog
          open={this.state.addInstanceOpen}
          onFilesDrop={this.filesDrop}
          onSubmit={this.addInstance}
          onRequestClose={() => this.setState({ addInstanceOpen: false })}
          serviceAccounts={this.props.serviceAccounts}
        />
      </div>
    )
  }
}
