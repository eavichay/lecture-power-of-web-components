import { createStore, combineReducers } from 'redux';

const user = (state = {}, action) => {
  if (action && action.type === 'SET_EMAIL') {
    state.email = action.data
  }
  return state
}

const store = createStore(
  combineReducers({
    user
  })
)


export default store