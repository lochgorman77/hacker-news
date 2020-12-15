import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopStoriesContainer from 'components/TopStories/TopStoriesContainer';
import NewStoriesContainer from 'components/NewStories/NewStoriesContainer';
import HeaderMenu from 'components/Menu/HeaderMenu';

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

        <Route path="/topstories" component={TopStoriesContainer} />
        <Route path="/newstories" component={NewStoriesContainer} />
        <Route path="/" component={TopStoriesContainer} />
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
