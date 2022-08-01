import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, getNotesDetail, getNotesDetailDelete, getNotesUpdateDetail } from '../reducers/notes/notes.action';
import { USER_NOTE_DETAIL_RESET } from '../reducers/notes/notes.types';


function Note({match, history}) {

    let noteId = match.params.id    
    
    let [note, setNoteDetail] = useState('')
    const [open, setOpen] = React.useState(false);


    const dispatch = useDispatch()

    const noteDetailState = useSelector(state => state.noteDetails)
    const { error, loading, noteDetail, success } = noteDetailState
    
    useEffect(() => {
        if (success){
            setNoteDetail(noteDetail)

        }else{
            if (noteId != 'new'){
            dispatch(getNotesDetail(noteId))
            }
        }
        
        
    }, [noteId, noteDetail, dispatch])

    useEffect(() => {
        console.log(noteId)
        if (noteId != 'new'){
            dispatch(getNotesDetail(noteId))
        } 
        
    }, [])

    useEffect(() => {
        return () => {
          dispatch({
            type: USER_NOTE_DETAIL_RESET
        })
        };
      }, []);

    

    let updateNote = () => {
            dispatch(getNotesUpdateDetail({noteId, ...note, 'updated': new Date() }))
    }


    let createNote = () => {
        if (noteId != 'new') return
       
            dispatch(createNewNote({...note, 'updated': new Date()}))
      
            history.push('/')
    }

    let deleteNote = async() => {
        if (noteId == 'new') return
        dispatch(getNotesDetailDelete(noteId))
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // let notes = note.find(note => note.id == noteId)

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    <>
                        <Grid sx={{ flexGrow: 0.9 }}>

                            <AvatarGroup max={4} sx={{ ml:4 }}>
                                {noteDetail? noteDetail.collaborators.map((collaborators, index) => (
                                    <Avatar alt={collaborators.collaborators.username} 
                                    src={collaborators.profile == null ? 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg' :  collaborators.profile.imageURL } />
                                )): ''}
                                
                            </AvatarGroup>
                        </Grid>
                        <button onClick={deleteNote}>Delete</button>
                    </>
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
            </textarea> :
            <textarea onChange={(e) => {setNoteDetail({...note, 'body': e.target.value})}} value = ''>
            </textarea>
            }

            <div>
                <div onClick={handleClickOpen} className='collaborate-button'>
                    <PersonAddAltIcon />
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle> <PersonAddAltIcon /> Add a Collaboration</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please add the authorized person as they can view/edit your notes.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add Them</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
  
    )
}

export default Note
