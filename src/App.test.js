
import * as actioncreators from './actions';
import * as actiontypes from './actiontypes'

import configureStore from 'redux-mock-store'

const middlewares = [];
const mockStore = configureStore(middlewares)

it('should dispatch action', () => {

  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  var timer = 0, crashoption = 'last';
  // Dispatch the action
  store.dispatch(actioncreators.startTimer(timer, crashoption));

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = { type: actiontypes.START_TIMER_RUN, timer: 0, running: true, crashoption: crashoption};
  
  expect(actions).toEqual([expectedPayload]);  
  
})