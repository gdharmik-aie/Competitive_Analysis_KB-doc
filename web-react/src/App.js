import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import DomainIcon from '@mui/icons-material/Domain';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
/* import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'; */
import DomainList from './components/Domain/DomainList'
import CompanyList from './components/Company/CompanyList'
import OfferingList from './components/Offering/OfferingList'
import OfferingDetails from './components/Offering/OfferingDetails'
import CreateOffering from './components/Offering/CreateOffering'
import UpdateOffering from './components/Offering/UpdateOffering'

import clsx from 'clsx'

import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Link as MUILink,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,

} from '@mui/icons-material'
import Dashboard from './components/Dashboard'
import CreateCompany from './components/Company/CreateCompany'
import CreateDomain from './components/Domain/CreateDomain'
import DomainDetails from './components/Domain/DomainDetails'
import CompanyDetails from './components/Company/CompanyDetails'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" href="https://grandstack.io/">
        Your GRANDstack App Name Here
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function App() {
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Router>
      <div className="root">
        <CssBaseline />
        <AppBar
          position="absolute"
          className={!open ? 'appBar' : 'appBarShift'}
        >
          <Toolbar className="toolbar">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={!open ? 'menuButtonHidden' : 'menuButton'}
            >
              <MenuIcon />
            </IconButton>
            {/*  <img
              className={classes.appBarImage}
              src="img/grandstack.png"
              alt="GRANDstack logo"
            /> */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="title"
            >
              Welcome To Competitive Analysis
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx('drawerPaper', !open && 'drawerPaperClose'),
          }}
          open={open}
        >
          <div className="toolbarIcon">
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" className="navLink">
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to="/domainList" className="navLink">
              <ListItem button>
                <ListItemIcon>
                  <DomainIcon />
                </ListItemIcon>
                <ListItemText primary="Domain" />
              </ListItem>
            </Link>

            <List className='unOrderedList'>
              <Link to="/createDomain" className="navLink">
                <ListItem button>
                  <ListItemIcon>
                    <DomainAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Domain" />
                </ListItem>
              </Link>
            </List>

            <Link to="/companyList" className="navLink">
              <ListItem button>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Company" />
              </ListItem>
            </Link>
            <List className='unOrderedList'>
              <Link to="/createCompany" className="navLink">
                <ListItem button>
                  <ListItemIcon>
                    <AddBusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Company" />
                </ListItem>
              </Link>
            </List>
            <Link to="/offeringList" className="navLink">
              <ListItem button>
                <ListItemIcon>
                  <TaskAltIcon />
                </ListItemIcon>
                <ListItemText primary="Offering" />
              </ListItem>
            </Link>
            <List className='unOrderedList'>
              <Link to="/createOffering" className="navLink">
                <ListItem button>
                  <ListItemIcon>
                    <AddTaskIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Offering" />
                </ListItem>
              </Link>
            </List>
          </List>
          <Divider />
        </Drawer>
        <main className={open ? 'contentShrink' : 'content'}>
          <div className="appBarSpacer" />
          <Container maxWidth="lg" className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/domainList" component={DomainList} />
              <Route exact path="/companyList" component={CompanyList} />
              <Route exact path="/offeringList" component={OfferingList} />
              <Route
                exact
                path="/detailsOffering"
                component={OfferingDetails}
              />
              <Route exact path="/createOffering" component={CreateOffering} />
              <Route exact path="/updateOffering" component={UpdateOffering} />
              <Route exact path="/detailsDomain" component={DomainDetails} />
              <Route exact path="/createDomain" component={CreateDomain} />
              <Route exact path="/createCompany" component={CreateCompany} />
              <Route exact path="/detailsCompany" component={CompanyDetails} />
            </Switch>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  )
}
