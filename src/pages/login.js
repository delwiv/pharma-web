import React, { useState, useDispatch } from 'reactn'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Copyright from '../components/Copyright'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
}))

const errors = {
  'bad-creds': 'Email ou mot de passe incorrect',
  generic: 'Une erreur est survenur, merci de réessayer',
}

export default function SignIn() {
  const classes = useStyles()

  const login = useDispatch('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleError = (reason) => {
    const message = errors[reason] || errors.generic
    setError(message)
  }

  const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const { loginError } = await login({ email, password })
    if (loginError) return handleError(loginError)
    console.log('push /orders')
    router.push('/orders')
  }

  const router = useRouter()
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
            onChange={handleEmail}
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
            onChange={handlePassword}
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
