import React, { useState, useEffect, useGlobal } from 'reactn'
import App from 'next/app'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'react-chat-widget/lib/styles.css'

import theme from '../theme'
import init from '../init'
import Loader from '../components/Loader.js'
// import { appWithTranslation } from '../utils/i18n.js'

const MyApp = ({ Component, pageProps }) => {
  const [appStarted] = useGlobal('appStarted')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const initApp = async () => {
      await init()
      setReady(true)
    }
    if (!appStarted) initApp()
  })

  return ready ? (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  ) : (
    <Loader withLogo />
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

//MyApp.getInitialProps = async context => {
//  const appProps = await App.getInitialProps(context)
//  return {
//    ...appProps,
//    namespacesRequired: ['common']
//  }
//}
export default MyApp
