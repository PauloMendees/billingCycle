import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { Provider } from "react-redux";
import configureStore  from './store'
import reducers from './reducer'
const theme = createTheme({
  palette: {
    primary:{
      main: '#306754',
      light: '#41A317',
      dark: '#254417',
    },
    secondary:{
      main: '#B22222',
      light: '#FF0000',
      dark: '#800000',
    },
    background: {
      paper: '#fff',
      default: '#fff'
    }
  }
})

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
