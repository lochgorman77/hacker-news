import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Detail from 'components/Details/Detail';

const styles = (theme) => ({
  root: {
    overflow: 'visible',
  },
});

export class Details extends Component {
  render() {
    const { details, classes } = this.props;

    return (
      <Grid item container spacing={3}>
        {details.map((detail, index) => {
          if (detail !== null) {
            return (
              <Grid key={index} className={classes.card} item xs={6}>
                <Detail detail={detail} />
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    );
  }
}
Details.propTypes = {
  details: PropTypes.array,
  classes: PropTypes.object,
};

Details.defaultProps = {
  details: {},
};
export const DetailsStyle = withStyles(styles, { name: 'Details' })(Details);
export default DetailsStyle;
