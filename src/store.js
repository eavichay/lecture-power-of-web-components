import { createStore, combineReducers, applyMiddleware } from 'redux';

const user = (state = {
  first: '',
  last: '',
  email: ''
}, action) => {
  if (action && action.type === 'SET_EMAIL') {
    state.email = action.data
  }
  return state
}

const store = createStore(
  combineReducers({
    user,
  }),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__(),
)


export default store