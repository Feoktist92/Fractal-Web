import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Reducer } from './slice';

const store = configureStore({
    reducer: Reducer,
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
