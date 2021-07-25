import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TypeBackground } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customShadows: {
      widget: 'string';
      widgetDark: 'string';
      widgetWide: 'string';
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      widget?: 'string';
      widgetDark?: 'string';
      widgetWide?: 'string';
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    light: string;
  }
}
