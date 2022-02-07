import React from 'react';
import { Box, Typography } from '@mui/material';
export default function ValueBox(props){
    const color = props.color
    return(
        <Box sx={{
            margin: '15px',
            width: '20vw',
            padding: 3,
            borderRadius: 1,
            backgroundColor: '#1c1c1c',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: `${color}`,
            flex: '1 1 20vw'
        }}>
            <Typography variant="h3" color="white" component="h2">
                {props.valor}
            </Typography>
        </Box>
    )
}