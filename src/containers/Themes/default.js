import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#CACAC8',
      main: '#0366A9',
      dark: '#4B1D39',
    },
  },
  overrides: {
    MuiTypography: {
      colorPrimary: {
        color: '#FFF',
      },
    },
  },
});
