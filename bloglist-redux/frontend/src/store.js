import { createStore, combineReducers } from 'redux';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer
    }
})


export default store