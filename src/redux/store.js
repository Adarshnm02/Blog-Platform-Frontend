import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'; 
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add `thunk` middleware manually
});

export { store };
