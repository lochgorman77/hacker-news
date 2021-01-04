import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Details from 'components/Details/Details';

import { fetchTopStories } from 'actions/stories';
import { getStories } from 'reducers/stories';
import { fetchDetails } from 'actions/details';
import { getDetails } from 'reducers/details';

export class TopStoriesContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTopStories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.stories[0] !== prevProps.stories[0]) {
      for (const story of this.props.stories) {
        this.props.handleFetchDetails(story);
      }
    }
  }

  render() {
    return <Details details={this.props.details}></Details>;
  }
}

TopStoriesContainer.propTypes = {
  handleFetchTopStories: PropTypes.func,
  handleFetchDetails: PropTypes.func,
  stories: PropTypes.array,
  details: PropTypes.array,
};

const mapStateToProps = (state) => ({
  stories: getStories(state),
  details: getDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFetchTopStories: () => dispatch(fetchTopStories()),
  handleFetchDetails: (id) => dispatch(fetchDetails(id)),
});

const ConnectedTopStoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopStoriesContainer);

export default ConnectedTopStoriesContainer;
