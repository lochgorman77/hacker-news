import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    ...theme.typography.button,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function HeaderMenu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button>
            <Link component={RouterLink} to="/">
              <FormattedMessage id={'menu.link.home'} />
            </Link>
          </Button>
          <Button color="secondary">
            <Link component={RouterLink} to="/topstories">
              <FormattedMessage id={'menu.link.top'} />
            </Link>
          </Button>
          <Button>
            <Link component={RouterLink} to="/newstories">
              <FormattedMessage id={'menu.link.new'} />
            </Link>
          </Button>
          <div className={classes.grow} />
          <Button color="inherit">
            <FormattedMessage id={'menu.link.login'} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
