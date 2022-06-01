import { combineReducers } from 'redux'
import { commentReducer } from './commentReducer'
import { postReducer } from './postReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  comments: commentReducer
})
