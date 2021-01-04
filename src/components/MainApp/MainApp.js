import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopStoriesContainer from 'components/TopStories/TopStoriesContainer';
import NewStoriesContainer from 'components/NewStories/NewStoriesContainer';
import HeaderMenu from 'components/Menu/HeaderMenu';
import PaginationApp from 'components/Pagination/PaginationApp';

const styles = (theme) => ({
  root: {
    margin: 'auto',
    width: '90%',
  },
});

export class MainApp extends Component {
  render() {
    return (
      <section id="page-container" className={this.props.classes.root}>
        <HeaderMenu />
        <PaginationApp />
        <Switch>
          <Route path="/topstories">
            <TopStoriesContainer />
          </Route>
          <Route path="/newstories">
            <NewStoriesContainer />
          </Route>
          <Route path="/">
            <TopStoriesContainer />
          </Route>
        </Switch>
      </section>
    );
  }
}
MainApp.propTypes = {
  match: PropTypes.object,
  classes: PropTypes.object,
};
export const MainAppStyle = withStyles(styles, { name: 'MainApp' })(MainApp);
export default MainAppStyle;
