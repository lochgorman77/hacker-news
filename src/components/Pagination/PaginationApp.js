import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import { updateStoriesPage } from 'actions/stories';
import { resetDetails } from 'actions/details';
import { getPageCount, getCurrentPage } from 'reducers/stories';

const styles = (theme) => ({
  pagination: {
    marginLeft: 'auto',
    float: 'right',
  },
});

export class PaginationApp extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.props.handleUpdateStoriesPage(value);
    this.props.handleResetDetails(value);
  };

  render() {
    return (
      <div id="page" className={this.props.classes.pagination}>
        <Pagination
          count={this.props.count}
          page={this.props.currentPage}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

PaginationApp.propTypes = {
  count: PropTypes.number,
  currentPage: PropTypes.number,
  classes: PropTypes.object,
  handleUpdateStoriesPage: PropTypes.func,
  handleResetDetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
  count: getPageCount(state),
  currentPage: getCurrentPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateStoriesPage: (page) => dispatch(updateStoriesPage(page)),
  handleResetDetails: (page) => dispatch(resetDetails()),
});

export const PaginationAppStyle = withStyles(styles, { name: 'PaginationApp' })(PaginationApp);
const ConnectedPaginationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationAppStyle);

export default ConnectedPaginationAppContainer;
