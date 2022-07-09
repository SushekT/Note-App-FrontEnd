import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getNotesDetail, getNotesUpdateDetail } from '../reducers/notes/notes.action';


function Note({match, history}) {

    let noteId = match.params.id    
    
    let [note, setNoteDetail] = useState('')


    const dispatch = useDispatch()

    const noteDetailState = useSelector(state => state.noteDetails)
    const { error, loading, noteDetail } = noteDetailState
    
    useEffect(() => {
        if (noteDetail){
            setNoteDetail(noteDetail)
        }else{
            dispatch(getNotesDetail(noteId))
        }
        
    }, [noteId, noteDetail])

    let updateNote = () => {
            dispatch(getNotesUpdateDetail({noteId, ...note, 'updated': new Date() }))
    }


    let createNote = async () => {
        if (noteId !== 'new') return
        await fetch(`http://notes.pandamotions.com/api/create`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date()} )
        })

        history.push('/')
    }

    let deleteNote = async() => {
        await fetch(`http://notes.pandamotions.com/api/delete/${noteId}`, {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        history.push('/')
    }

    let handleSubmit = () =>{

        if (noteId !== 'new' && !note.body){
            deleteNote()
        }

        else if(noteId !== 'new'){
            updateNote()
        }

        else if(noteId === 'new' && note !== ''){
            createNote()
        }
        
        history.push('/')
    }

    //let note = notes.find(note => note.id == noteId)

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            {loading ? 
                <Box sx={{ ml:28, mt:10}}>
                <CircularProgress color={'warning'} />
              </Box>
            : note? 
            <textarea onChange={(e) => {setNoteDetail({...note, 'body': e.target.value})}} value={note.body}>
            </textarea> : ''
            }

        </div>
  
    )
}

export default Note
