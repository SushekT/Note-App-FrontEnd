import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Message({width, error}) {
  
    return (
        <Stack sx={{ width: {width} }} spacing={5}>
            <Alert severity="error">{error}</Alert>
        </Stack>
    )
}

export default Message;