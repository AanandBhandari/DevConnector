import {GET_PROFILE,PROFILE_ERROR, CLEAR_PROFILE,UPDATE_PROFILE, GET_PROFILES, GET_REPOS} from '../actions/types'
const initalState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}
export default function (state = initalState,action) {
    const {type , payload} = action;
    switch (type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
             return{
                 ...state,
                 profile:payload,
                 loading: false
             }
        case GET_PROFILES:
            return{
                ...state,
                profiles : payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
                error: {}
            }
        case GET_REPOS:
            return{
                ...state,
                repos: payload,
                loading: false
            }
    
        default:
            return state;
    }
}