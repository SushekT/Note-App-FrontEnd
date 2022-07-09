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

const NotePage = () => {

    let [noteslist, setNotes] = useState('')
    const [open, setOpen] = React.useState(false);

    const noteState = useSelector(state => state.notes)
    const { error, loading, notes } = noteState

    const dispatch = useDispatch()

    useEffect(()=>{
    if (notes){
        setNotes([notes])
    }else{
        dispatch(getNotes())
    }    
    },[notes])

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
                <p className='notes-count'>{noteslist.length}</p>
            </div>

            <div className='notes-list'>
                {!loading ? noteslist ? noteslist.map((note, index)=> (
                    <ListItem key={index} note={note} />
                )) : 
                '' : 
                <Box sx={{ ml:28, mt:10}}>
                <CircularProgress color={'warning'} />
              </Box>}

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
