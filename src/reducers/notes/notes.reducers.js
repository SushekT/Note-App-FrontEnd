import { 
    USER_NOTES_REQUEST,
    USER_NOTES_SUCCESS,
    USER_NOTES_FAIL,

    USER_NOTE_DETAIL_REQUEST,
    USER_NOTE_DETAIL_SUCCESS,
    USER_NOTE_DETAIL_FAIL,

    USER_NOTE_DETAIL_UPDATE_REQUEST,
    USER_NOTE_DETAIL_UPDATE_SUCCESS,
    USER_NOTE_DETAIL_UPDATE_FAIL

 } from './notes.types'

 export const noteReducer = (state = { }, action) => {

    switch (action.type){
        case USER_NOTES_REQUEST:
            return {loading: true, }

        case USER_NOTES_SUCCESS:
            return { loading: false, notes: action.payload }

        case USER_NOTES_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
 }

 export const noteDetailReducer = (state = { }, action) => {

    switch (action.type){
        case USER_NOTE_DETAIL_REQUEST:
            return {loading: true, }

        case USER_NOTE_DETAIL_SUCCESS:
            return { loading: false, noteDetail: action.payload }

        case USER_NOTE_DETAIL_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
 }