import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createForms } from 'react-redux-form';
import { Bikes } from './bikes'
import thunk from 'redux-thunk'
import { InitialBike } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            bikes: Bikes,
            ...createForms({
                bike: InitialBike
            })
        }),
        applyMiddleware(thunk)
    );

    return store;
}