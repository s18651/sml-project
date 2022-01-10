import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

ReactDOM.render(
  <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
