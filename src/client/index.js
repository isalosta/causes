import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter><Loader /></BrowserRouter>, document.getElementById('target_render'));
