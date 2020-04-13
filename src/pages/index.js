import React, {
  Component,
  useGlobal,
  setGlobal,
  getGlobal,
  useState
} from 'reactn'
import router from 'next/router'
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import api from '../utils/api'

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
class Index extends Component {
  async componentDidMount () {
    const { user, error } = await api.get('/users/me')
    if (error) {
      return router.push('/login')
    }
    if (user) {
      return router.push('/orders')
    }
  }

  render () {
    const { user, error, classes } = this.props
    return (
      <div className={classes.container}>
        <CircularProgress />
        <img src='/otzii_black.png' alt='brand-logo' />
      </div>
    )
  }
}
export default withStyles(useStyles)(Index)
