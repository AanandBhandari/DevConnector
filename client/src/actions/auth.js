import axios from 'axios';
import {setAlert} from './alert'
import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : AUTH_ERROR
        })
    }
}

// Register User
// how always dispatch as second function params
export const register = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});
    try {
      const res = await axios.post('/api/users', body,config);
      dispatch({
          type : REGISTER_SUCCESS,
          payload: res.data
      });
        dispatch(loadUser());  
    } catch (err) {
        const errors = err.response.data.errors; 
        if(errors) {
            // setAlert has already dispatch method why do we need to call here also
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        // it should be store.dispatch bt only dispatch
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


// login user
export const login = (email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({    email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            // setAlert has already dispatch method why do we need to call here also
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // it should be store.dispatch bt only dispatch
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// logout
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE })  
    dispatch({ type: LOGOUT})
}
 