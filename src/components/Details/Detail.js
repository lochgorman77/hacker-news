import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { withStyles } from '@material-ui/styles';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  root: {
    overflow: 'visible',
    minWidth: 500,
  },
  comment: {
    marginLeft: 'auto',
  },
});

const units = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

export class Detail extends Component {
  timeAgo = (date) => {
    const dateTime = DateTime.fromSeconds(date);
    const diff = dateTime.diffNow().shiftTo(...units);
    const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';

    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
  };

  render() {
    const { detail, classes } = this.props;

    const time = this.timeAgo(detail.time);
    return (
      <Card className={classes.root} raised>
        <CardHeader title={detail.title} />
        <CardContent>
          <Typography variant="caption" color="textSecondary">
            {detail.score} <FormattedMessage id={'detail.view.by'} /> {detail.by}{' '}
            {time.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small">
            <Link href={detail.url} color="secondary" target="_blank" rel="noopener">
              <FormattedMessage id={'detail.view.link'} />
            </Link>
          </Button>
          <Button size="small" className={classes.comment}>
            {detail.descendants} <FormattedMessage id={'detail.view.comments'} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}
Detail.propTypes = {
  detail: PropTypes.object,
  classes: PropTypes.object,
};

Detail.defaultProps = {
  detail: {},
};
export const DetailStyle = withStyles(styles, { name: 'Details' })(Detail);
export default DetailStyle;
