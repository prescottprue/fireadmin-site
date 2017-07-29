import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import LoadingSpinner from 'components/LoadingSpinner'
import Instances from 'routes/Projects/routes/Project/components/Instances'
import classes from './ProjectContainer.scss'

// Get project path from firebase based on params prop (route params)
@firebaseConnect(({ params }) => ([
  `projects/${params.projectname}`
]))
// Map state to props
@connect(({ firebase }, { params }) => ({
  project: dataToJS(firebase, `projects/${params.projectname}`)
}))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object,
    params: PropTypes.object.isRequired
  }

  state = {
    addInstanceOpen: false
  }

  addInstance = () => {
    this.props.firebase.push('instances', {})
  }

  render () {
    const { project, params } = this.props

    if (isEmpty(project)) {
      return (
        <div>
          Project not found
        </div>
      )
    }

    if (!isLoaded(project)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <h2>Project Container</h2>
        <pre>{JSON.stringify(project, null, 2)}</pre>
        <RaisedButton
          label='Add Instance'
          onTouchTap={() => this.setState({ addInstanceOpen: true })}
        />
        {
          project.instances
          ?
            <Instances
              instances={project.instances}
            />
          :
            <span>No Instances</span>
        }
        <Dialog
          open={this.state.addInstanceOpen}
          title='Add Instance'
        >
          <div>
            Drag To Upload Service Account
          </div>
        </Dialog>
      </div>
    )
  }
}
