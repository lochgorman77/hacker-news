import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import { getPageCount } from 'reducers/stories';

const styles = (theme) => ({
  pagination: {
    marginLeft: 'auto',
    float: 'right',
  },
});

export class PaginationApp extends Component {
  render() {
    return (
      <div id="page" className={this.props.classes.pagination}>
        <Pagination count={this.props.count} page={this.props.page} onChange={this.handleChange} />
      </div>
    );
  }
}

PaginationApp.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  page: 1,
  count: getPageCount(state),
});

const mapDispatchToProps = (dispatch) => ({});

export const PaginationAppStyle = withStyles(styles, { name: 'PaginationApp' })(PaginationApp);
const ConnectedPaginationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationAppStyle);

export default ConnectedPaginationAppContainer;
