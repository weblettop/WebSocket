import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { ws } from '../api';

const store = configureStore({ reducer: rootReducer });

ws.bringStoreToSocket(store);

export default store;
