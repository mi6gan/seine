import * as React from 'react';
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { actions } from '@storybook/addon-actions';
import { Editor } from '@seine/editor';
import {
  BusinessCenter as BusinessCenterIcon,
  Add as AddIcon,
  Image as ImageIcon,
  ViewList as ViewListIcon,
  Ballot as BallotIcon,
  Info as InfoIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  main: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  content: {
    width: '100%',
    maxWidth: theme.breakpoints.width('lg'),
  },
  title: {
    textDecoration: 'none',
  },
  toolbar: theme.mixins.toolbar,
}));

export default { title: 'Admin' };

export const EditorInLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={'permanent'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary={'View'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BallotIcon />
            </ListItemIcon>
            <ListItemText primary={'Ballots'} />
            <ListItemSecondaryAction>
              <IconButton aria-label={'Add ballot'}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={'Business center'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={'Info'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary={'Images'} />
            <ListItemSecondaryAction>
              <IconButton aria-label={'Add image'}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.main}>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Editor
            parent={{
              id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
              type: 'page',
              body: null,
              format: null,
              parent_id: null,
            }}
            {...actions('onChange')}
          >
            {children}
          </Editor>
        </div>
      </main>
    </div>
  );
};
