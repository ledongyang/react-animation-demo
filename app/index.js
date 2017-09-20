'use strict'

import React from 'react';
import { render } from 'react-dom';
import Table from './components/main';
import { Provider } from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <Table />
  </Provider>,
  document.getElementById('main')
)
