import React, { getGlobal, useGlobal, useEffect, useState } from 'reactn'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import {
  Avatar,
  CssBaseline,
  Drawer,
  Box,
  Button,
  AppBar,
  Toolbar,
  List,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Badge,
  ListItem,
  Container,
  Grid,
  Paper,
  Link
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'

import { mainListItems, secondaryListItems } from './Menu'
import Copyright from '../Copyright'
import { logout } from '../../utils/auth'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  logo: { width: drawerWidth / 2, height: 'auto' },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const withLayout = Page => {
  return () => {
    const classes = useStyles()

    const [open, setOpen] = useState(true)
    const [isMenuOpen, setMenuOpen] = useState(null)
    const router = useRouter()
    const [user, setUser] = useGlobal('user')
    const firstLetter = user ? user.email[0].toUpperCase() : '?'
    const { pageName } = getGlobal()

    const handleDrawerOpen = () => {
      setOpen(true)
    }

    const handleDrawerClose = () => {
      setOpen(false)
    }

    const handleAvatarClick = event => {
      setMenuOpen(event.currentTarget)
    }

    const handleClose = () => {
      setMenuOpen(null)
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
      <div className={classes.root}>
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              {pageName}
            </Typography>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleAvatarClick}
            >
              {firstLetter}
            </Avatar>
            <Menu
              id='simple-menu'
              anchorEl={isMenuOpen}
              keepMounted
              open={Boolean(isMenuOpen)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => router.push('/profile')}>
                Mon profil
              </MenuItem>
              <MenuItem onClick={logout}>Déconnexion</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>

            <ListItem>
              <Link href='/'>
                <img className={classes.logo} src='/otzii_black.png' />
              </Link>
            </ListItem>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          {/*<List>{secondaryListItems}</List>*/}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
              <Page />
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    )
  }
}

export default withLayout
