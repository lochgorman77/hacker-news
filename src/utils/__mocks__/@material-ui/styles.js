// __mocks__/@material-ui/styles.js
import React from 'react';
import theme from 'containers/Themes/default';

const styles = jest.requireActual('@material-ui/styles');

const makeStyles = (style, options) => () => {
  // Apply theme to classes
  const classes = typeof style === 'function' ? style(theme) : style;

  // Generate class name with correct component name without any index
  const classesByProps = {};
  Object.keys(classes).forEach((key) => {
    classesByProps[key] = options ? `${options.name}-${key}` : key;
  });

  return classesByProps;
};

export const withStyles = (style, options) => {
  const useStyles = makeStyles(style, options);
  return (Component) => {
    const classes = useStyles();

    const MockComponent = (props) => <Component classes={classes} {...props} />;

    MockComponent.displayName = (options && options.name) || Component.displayName;

    return MockComponent;
  };
};
module.exports = {
  ...styles,
  makeStyles,
  withStyles,
};
