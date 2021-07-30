import { combineReducers, createStore } from 'redux';
import { HomeReducer, PageState } from '../routes/Home';

export type AppState = {
    home: PageState;
};

export const store = createStore(
    combineReducers({
        home: HomeReducer,
    }),
);
