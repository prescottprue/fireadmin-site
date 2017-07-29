import React from 'react'
import Theme from 'theme'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import { paths } from 'constants'
import classes from './Home.scss'

const fireadminSiteUrl = 'https://github.com/prescottprue/fireadmin-site'
const fireadminUrl = 'https://github.com/prescottprue/fireadmin'

export const Home = () => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
    <Paper className={classes.paper}>
      <div className='flex-row-center'>
        <h2>Welcome To Fireadmin</h2>
      </div>
      <div className='flex-row-center'>
        <span> start managing your Firebase instances</span>
      </div>
      <div className='flex-column-center'>
        <h3>Three Options</h3>
        <span><Link to={paths.login}>Login</Link> to To use fireadmin.io directly</span>
        <span>Run your own version of <a ref={fireadminSiteUrl}>fireadmin-site</a></span>
        <span>Use <a ref={fireadminUrl}>fireadmin</a> to build your own admin pannel</span>
      </div>
    </Paper>
  </div>
)

export default Home
