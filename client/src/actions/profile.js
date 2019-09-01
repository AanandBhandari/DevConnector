import axios from 'axios';
import {setAlert} from './alert';
import {PROFILE_ERROR,GET_PROFILE} from './types';

// get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type : GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload : {msg:err, status: err.response.status}
        });
    }
};
// Create or Update profile
export const createProfile = (formData, history, edit =false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit? 'Profile Updated': 'Profile Created','success'));
        if(!edit) {
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            // setAlert has already dispatch method why do we need to call here also
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err, status: err.response.status }
        });
    }
}