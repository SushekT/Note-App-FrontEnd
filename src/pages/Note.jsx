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
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, getNotesDetail, getNotesDetailDelete, getNotesUpdateDetail } from '../reducers/notes/notes.action';
import { USER_NOTE_DETAIL_RESET } from '../reducers/notes/notes.types';

interface Film {
    title: string;
    year: number;
  }
  
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  // Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];

function Note({match, history}) {

    let noteId = match.params.id

    const [collaborateOpen, setCollaborateOpen] = React.useState(false);
    const [options, setOptions] = useState({ 
        title: '',
        year: 0,
});
    const collaborateLoading = collaborateOpen && options.length === 0;
        
    
    let [note, setNoteDetail] = useState('')
    const [open, setOpen] = React.useState(false);


    const dispatch = useDispatch()

    const noteDetailState = useSelector(state => state.noteDetails)
    const { error, loading, noteDetail, success } = noteDetailState

    useEffect(() => {
        let active = true;
    
        if (!collaborateLoading) {
          return undefined;
        }
    
        (async () => {
          await sleep(1e3); // For demo purposes.
    
          if (active) {
            setOptions([...topFilms]);
          }
        })();
    
        return () => {
          active = false;
        };
      }, [collaborateLoading]);


      React.useEffect(() => {
        if (!collaborateOpen) {
          setOptions([]);
        }
      }, [collaborateOpen]);
    
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
                                {noteDetail? noteDetail.collaborators.map((collaborators) => (
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
                    <Autocomplete
                        id="asynchronous-demo"
                        sx={{ width: 500, mt: 2 }}
                        open={collaborateOpen}
                        onOpen={() => {
                            setCollaborateOpen(true);
                        }}
                        onClose={() => {
                            setCollaborateOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        options={options}
                        loading={collaborateLoading}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Search By Email"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {collaborateLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                            />
                        )}
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
