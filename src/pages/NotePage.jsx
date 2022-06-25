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

const NotePage = () => {

    let [notes, setNotes] = useState([])
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        getNotes()

    },[])

    let getNotes = async() => {
        let response = await fetch('http://notes.pandamotions.com/api/')
        let data = await response.json()

        setNotes(data)
    }
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
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.map((note, index)=> (
                    <ListItem key={index} note={note} />
                ))}

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
