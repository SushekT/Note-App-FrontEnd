import {
    COLLABORATION_REQUEST,
    COLLABORATION_SUCCESS,
    COLLABORATION_FAIL,
    COLLABORATION_RESET
} from './collaboration.types'


export const collaboratorReducer = (state = { }, action) => {

    switch (action.type){
        case COLLABORATION_REQUEST:
            return {loading: true, success:false}

        case COLLABORATION_SUCCESS:
            return { loading: false, collaboratorData: action.payload, success:true }

        case COLLABORATION_FAIL:
            return {loading: false, error: action.payload, success:false}

        case COLLABORATION_RESET:
            return {}

        default:
            return state
    }
 }