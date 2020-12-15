import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Details from 'components/Details/Details';

import { fetchTopStories } from 'actions/stories';
import { getTopStories } from 'reducers/stories';
import { fetchDetails } from 'actions/details';
import { getDetails } from 'reducers/details';
import { pageSize } from 'constants/ActionTypes';

export class TopStoriesContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTopStories();
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

TopStoriesContainer.propTypes = {
  handleFetchTopStories: PropTypes.func,
  handleFetchDetails: PropTypes.func,
  stories: PropTypes.array,
  details: PropTypes.array,
};

const mapStateToProps = (state) => ({
  stories: getTopStories(state),
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
