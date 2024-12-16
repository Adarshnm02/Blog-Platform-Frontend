import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import searchReducer from './searchSlice'

const store = configureStore({
    reducer: {
        user : userReducer,
        search: searchReducer,
    }
})

export default store;