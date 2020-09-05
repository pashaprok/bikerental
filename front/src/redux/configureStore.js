import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Bikes } from './bikes'
import thunk from 'redux-thunk'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            bikes: Bikes
        }),
        applyMiddleware(thunk)
    );

    return store;
}