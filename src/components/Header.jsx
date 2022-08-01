import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';



const Qqq = (props) => {
    return (
        <Avatar alt="Sushek" src=""
            id="basic-button"
            aria-controls={props.open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={props.open ? 'true' : undefined}
            onClick={props.handleClick}
    ></Avatar>
    )
  }
const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
 
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));
      

      const [anchorEl, setAnchorEl] = useState(null)
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event);
      };
    return(
        <div className='app-header'>
             <Grid item xs={8}><h1>Notes App</h1></Grid>
             <Grid item xs={4}>
              {
                userInfo ? (<>
                  <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                  >
                  <Qqq handleClick={handleClick} open={open}/>
                  </StyledBadge>
                  </>
                ) : ''
              }
           
            </Grid>
            
        </div>

    )
}

export default Header;