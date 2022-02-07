import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import autenticarRequest from './autenticarRequest'
import LoadingButton from '@mui/lab/LoadingButton';
import { CLEAR } from '../../constants/autenticacao';

export default function AutenticacaoPage() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.autenticacao.token)
    const message = useSelector((state) => state.autenticacao.message)
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [manterLogado, setManterLogado] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [showError, setShowError] = useState(false)
    function Logar() {
        const usuario = {
            userName: user,
            password: password
        }

        dispatch(autenticarRequest(usuario))
    }

    useEffect(() => {
        if (manterLogado) {
            window.localStorage.setItem('jwt', token)
        } else {
            window.sessionStorage.setItem('jwt', token)
        }
    }, [token])

    useEffect(() => {
        if (message.includes('Usuário ou senha incorretos')) {
            setShowError(true)
            setLoadingButton(false)
        }
    }, [message])

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: {
                    xs: '90vw',
                    sm: '80vw',
                    md: '45vw',
                    lg: '35vw',
                    xl: '25vw'
                },
                height: '50vh',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 1
            }}>
                <Typography variant="h4" component="h1" color="primary">
                    BillingCycle APP
                </Typography>
                <Box sx={{
                    width: '100%',
                    marginTop: 3
                }}>
                    <TextField
                        value={user}
                        onChange={(ev) => setUser(ev.target.value)}
                        required
                        label="UserName"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
                        }}
                    />
                </Box>
                <Box sx={{
                    width: '100%',
                    marginTop: 3
                }}>
                    <TextField
                        required
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>,
                            startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                        }}
                    />
                </Box>
                <Box sx={{
                    width: '100%',
                    marginTop: 3,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={manterLogado}
                                    onChange={() => setManterLogado(!manterLogado)}
                                />
                            }
                            label="Manter-me conectado" />
                    </FormGroup>
                </Box>
                {showError ? (
                    <Box sx={{
                        width: '100%',
                        marginTop: 3
                    }}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="outlined" severity="error">
                                Usuário ou senha incorretos.
                            </Alert>
                        </Stack>
                    </Box>
                ) : (
                    <></>
                )}
                <Box sx={{
                    width: '100%',
                    marginTop: 3
                }}>
                    {loadingButton ? (
                        <LoadingButton loading variant="contained" fullWidth>
                            Fetch data
                        </LoadingButton>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                Logar()
                                setLoadingButton(true)
                            }}
                        >
                            SIGN in
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}