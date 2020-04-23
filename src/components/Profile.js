import React from 'reactn'
import { Paper } from '@material-ui/core'

const Profile = ({ user }) => {
  const handle = (e) => {}
  return (
    <Paper>
      <h1>Infos</h1>
      <form noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          autoComplete='email'
          autoFocus
          onChange={handle}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Mot de passe'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handle}
        />
        {/*<FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />*/}
        {error && <p className={classes.error}>{error}</p>}
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          type='submit'
          className={classes.submit}
        >
          Connexion
        </Button>
        {/*<Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>*/}
      </form>
    </Paper>
  )
}

export default Profile
