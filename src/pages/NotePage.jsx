import React, {useState, useEffect} from 'react'

//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../reducers/notes/notes.action';
import { USER_NOTES_RESET, USER_NOTE_DETAIL_DELETE_RESET, USER_NOTE_DETAIL_RESET } from '../reducers/notes/notes.types';

const NotePage = () => {

    const [noteslist, setNotesList] = useState([])
    const [open, setOpen] = React.useState(false);

    const noteState = useSelector(state => state.notes)
    const { error, loading, notes, success } = noteState

    
    const noteDetailState = useSelector(state => state.noteDetails)
    const { success:noteDetailSuccess } = noteDetailState

    const noteDeleteState = useSelector(state => state.noteDetailsDelete)
    const { success:noteDeleteSuccess } = noteDeleteState

    const dispatch = useDispatch()
    
    useEffect(()=>{
        setNotesList(notes)
        if (noteDetailSuccess){
            dispatch(getNotes())
            dispatch({
                type: USER_NOTE_DETAIL_RESET
            })
        }
        if(noteDeleteSuccess){
            dispatch(getNotes())
            dispatch({
                type: USER_NOTE_DETAIL_DELETE_RESET
            })
        }
    }, [success,noteDetailSuccess,notes, noteDeleteSuccess])

    useEffect(()=>{
        dispatch(getNotes())
    }, [])

    useEffect (() =>{
        return () => { 
            console.log('page reset vayo')
            dispatch({
              type: USER_NOTES_RESET
          })
          };
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    
        <div className="notes">
            <div className='notes-header'>
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className='notes-count'>{noteslist? noteslist.length: ''}</p>
            </div>

            <div className='notes-list'>
                {console.log(noteslist)}
                {
                loading ?  
                <Box sx={{ ml:28, mt:10}}>
                        <CircularProgress color={'warning'} />
                    </Box>
                     :  noteslist ? 
                     noteslist.map((note, index)=> (
                         <ListItem key={index} note={note} />
                     )) :
                    ''     
                }

            </div>

            <AddButton />
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

export default NotePage
