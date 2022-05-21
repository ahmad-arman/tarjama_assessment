import thunk from 'redux-thunk';
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import {applyMiddleware} from 'redux';

import users from './users';
import posts from './posts';

let reducers =combineReducers({users:users,posts:posts});

let store =configureStore({reducer: reducers},applyMiddleware(thunk));

export default store ;