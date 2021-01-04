import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Details from 'components/Details/Details';

import { fetchNewStories } from 'actions/stories';
import { getStories } from 'reducers/stories';
import { fetchDetails } from 'actions/details';
import { getDetails } from 'reducers/details';

export class NewStoriesContainer extends Component {
  componentDidMount() {
    this.props.handleFetchNewStories();
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

NewStoriesContainer.propTypes = {
  handleFetchNewStories: PropTypes.func,
  handleFetchDetails: PropTypes.func,
  stories: PropTypes.array,
  details: PropTypes.array,
};

const mapStateToProps = (state) => ({
  stories: getStories(state),
  details: getDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleFetchNewStories: () => dispatch(fetchNewStories()),
  handleFetchDetails: (id) => dispatch(fetchDetails(id)),
});

const ConnectedNewStoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStoriesContainer);

export default ConnectedNewStoriesContainer;
