import axios from 'axios'
import {
    COLLABORATION_REQUEST,
    COLLABORATION_SUCCESS,
    COLLABORATION_FAIL,
} from './collaboration.types'

export const addCollaboration = (formData, noteId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLLABORATION_REQUEST
        })
        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `/user/addacollaboration/${noteId}/`,
            formData,
            config,
        )

        dispatch({
            type: COLLABORATION_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: COLLABORATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }