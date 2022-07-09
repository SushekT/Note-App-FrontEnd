import axios from 'axios'
import { 
    USER_NOTES_REQUEST,
    USER_NOTES_SUCCESS,
    USER_NOTES_FAIL,

    USER_NOTE_DETAIL_REQUEST,
    USER_NOTE_DETAIL_SUCCESS,
    USER_NOTE_DETAIL_FAIL

 } from './notes.types'


 export const getNotes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_NOTES_REQUEST
        })

        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            '/api/notes/',
            config
        )

        dispatch({
            type: USER_NOTES_SUCCESS,
            payload: data
        })

        localStorage.setItem('notes', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_NOTES_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }

 export const getNotesDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_NOTE_DETAIL_REQUEST
        })

        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            `/api/notes/${id}/`,
            config
        )

        dispatch({
            type: USER_NOTE_DETAIL_SUCCESS,
            payload: data
        })

        localStorage.setItem('notes', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_NOTE_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }

 export const getNotesUpdateDetail = (notes) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_NOTE_DETAIL_REQUEST
        })

        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            `/api/notes/${notes.noteId}/`,
            notes,
            config
        )

        dispatch({
            type: USER_NOTE_DETAIL_SUCCESS,
            payload: data
        })

        localStorage.setItem('notes', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_NOTE_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }