import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { CLEAR } from '../../constants/debitos';
import { CLEAR_CREDIT } from '../../constants/creditos'
import { useDispatch } from 'react-redux';
export default function TableTitle(props) {
    const dispatch = useDispatch()
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center'
        }}>{
                !props.variant ? (
                    <>
                        <Typography variant="h5" sx={{
                            color: props.color
                        }}>
                            <b>Débitos</b>
                        </Typography>
                        <Button color="secondary" variant="outlined" onClick={() => {
                            dispatch({ type: CLEAR })
                            props.openRegisterModal()
                        }}>ADD DÉBITO</Button>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                color: props.color
                            }}
                        >
                            <b>Créditos</b>
                        </Typography>
                        <Button color="primary" variant="outlined" onClick={() => {
                            dispatch({ type: CLEAR_CREDIT })
                            props.openRegisterModal()
                        }}>ADD CRÉDITO</Button>
                    </>
                )
            }
        </Box>
    )
}