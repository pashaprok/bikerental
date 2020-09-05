import { baseUrl } from '../shared/baseUrl';
import { 
    BIKES_LOADING, 
    ADD_BIKES, 
    BIKES_FAILED 
} from './ActionTypes';

export const fetchBikes = () => (dispatch) => {

    dispatch(bikesLoading(true));
  
    return fetch(baseUrl + 'bikes')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(bikes => dispatch(addBikes(bikes)))
        .catch(error => dispatch(bikesFailed(error.message)));
}
  
export const bikesLoading = () => ({
    type: BIKES_LOADING
});
  
export const bikesFailed = (errmess) => ({
    type: BIKES_FAILED,
    payload: errmess
});
  
export const addBikes = (bikes) => ({
    type: ADD_BIKES,
    payload: bikes
});