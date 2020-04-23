import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
const Loader = ({ classes, withLogo = false }) => (
  <div className={classes.container}>
    <CircularProgress />
    {withLogo && <img src='/otzii_black.png' alt='brand-logo' />}
  </div>
)

export default withStyles(useStyles)(Loader)
