/* @flow */
import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  browserHistory,
  createMemoryHistory,
  Router,
  Route
} from 'react-router';
import injectReducers from './client/helpers/injectReducers';

export const getClientHistory = (store: Object): Object =>
  syncHistoryWithStore(browserHistory, store);

export const getServerHistory = (store: Object, url: string): Object =>
  syncHistoryWithStore(createMemoryHistory(url), store);

export const getRoutes = (
  history: Object,
  store: Object,
  options: Object = {}
): Object => (
  <Router history={history} {...options}>
    <Route
      path="/"
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure(
          [
            './client/components/task-manager',
            './client/components/task-manager/logicBundle'
          ],
          require => {
            const {
              default: taskManagerReducer,
              mountPoint: taskManagerMountPoint
            } = require('./client/components/task-manager/logicBundle');

            injectReducers(store, {
              [taskManagerMountPoint]: taskManagerReducer
            });
            cb(null, require('./client/components/task-manager').default);
          },
          'task-manager-page'
        );
      }}
    />
    <Route
      path="/static-page"
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure(
          [],
          require => {
            cb(null, require('./client/components/static-page').default);
          },
          'static-page'
        );
      }}
    />
  </Router>
);
