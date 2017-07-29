import React from 'react'
import Theme from 'theme'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import { paths } from 'constants'
import classes from './Home.scss'

export const Home = () => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
    <Paper className={classes.paper}>
      <div className='flex-row-center'>
        <h2>Welcome To Fireadmin</h2>
      </div>
      <div className='flex-row-center'>
        <span><Link to={paths.login}>Login</Link> to start managing your Firebase instances</span>
      </div>
    </Paper>
  </div>
)

export default Home
