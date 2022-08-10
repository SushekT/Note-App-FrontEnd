import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar } from '@mui/material';

import Message from '../components/Message';
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { getProfileUpdate, profileUpdate } from '../reducers/login/login.action';

export default function UpdateProfile() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('')
    const width = '60%;'


    const dispatch = useDispatch()

    const loadUpdateProfile = useSelector(state => state.userProfileUpdate)
    const { error, loading, loadedUpdatedProfile, success } = loadUpdateProfile

    useEffect(() =>{

        if (success){
            setFirstName(loadedUpdatedProfile.user.first_name);
            setLastName(loadedUpdatedProfile.user.last_name);
        }

    },[success])

    useEffect(() => {
        dispatch(getProfileUpdate());
        
    }, [])

    const history = useHistory()
    let handleSubmit = () =>{
        history.push('/')
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(profileUpdate(firstName, lastName, image))
        history.push('/')
    }
    return (
    <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
            </div>
            <Paper container elevation={3}>
            <Grid container item xs={12} marginTop={10} alignItems="center" direction="column">
                <ManageAccountsIcon sx={{ color: 'action.active', mt:3}}/>
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'action.active', }}>
                    Update Your Profile
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 340 }} padding={1}>
                
                    <TextField id="firstName" label="First Name" type="text" value={firstName}
                    variant="standard" margin='dense' onChange={(e) => setFirstName(e.target.value)} sx={{mr:1}}/>
                
                    <TextField id="lastName" label="Last Name" type="text" value={lastName}
                     variant="standard" margin='dense' onChange={(e) => setLastName(e.target.value)}/>
        
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                <IconButton color="warning" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                    <PhotoCamera />  
                </IconButton> 
                <Avatar alt={firstName} src={image} sx={{ width: 24, height: 24 }} />
                <Typography variant="p" gutterBottom component="p" sx={{ color: 'action.active', fontSize: 12 }}>
                    Upload Your Profile Photo
                </Typography>
            </Grid>
            
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                { error && <Message width={width} alignItems="center" error={error} /> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2, mb:2}} onClick={submitHandler} >
            {
                loading ? <CircularProgress /> : 'Confirm'
            }
            </Button>
            </Grid>
            
            
        </Paper>
        </div>
    )
    }

