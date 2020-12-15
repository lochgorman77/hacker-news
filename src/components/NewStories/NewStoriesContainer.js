import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Details from 'components/Details/Details';

import { fetchNewStories } from 'actions/stories';
import { getNewStories } from 'reducers/stories';
import { fetchDetails } from 'actions/details';
import { getDetails } from 'reducers/details';
import { pageSize } from 'constants/ActionTypes';

export class NewStoriesContainer extends Component {
  componentDidMount() {
    this.props.handleFetchNewStories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.stories !== prevProps.stories) {
      for (let i = 0; i < pageSize; i++) {
        this.props.handleFetchDetails(this.props.stories[i]);
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
  stories: getNewStories(state),
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
