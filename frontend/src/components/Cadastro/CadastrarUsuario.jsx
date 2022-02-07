import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Modal, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import cadastrarUser from './cadastrarUser';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CLEAR_USER } from '../../constants/usuarios';
import LockIcon from '@mui/icons-material/Lock';

export default function CadastrarUsuario(props) {
    const message = useSelector((state) => state.usuarios.message)
    const [userName, setUserName] = useState('')
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [definedMessage, setDefinedMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const dispatch = useDispatch();
    function createNewUser() {
        const user = {
            userName: userName,
            email: email,
            nome: nome,
            password: password,
            passwordConfirmation: confirmPassword
        }
        dispatch(cadastrarUser(user))
    }

    useEffect(() => {
        if (message !== null) {
            setDefinedMessage(message)
        }
    }, [message])

    useEffect(() => {
        if (definedMessage === "Usuário criado com sucesso") {
            setShowMessage(true)
        } else {
            setShowMessage(false)
        }
    }, [definedMessage])

    useEffect(() => {
        dispatch({ type: CLEAR_USER })
    }, [props.registerModal])

    return (
        <div>
            <Modal
                open={props.registerModal}
                onClose={props.closeRegisterModal}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 3
                }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" color="primary">
                        Cadastrar usuários
                    </Typography>
                    <Box sx={{
                        marginTop: 4,
                        marginBottom: 4
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="Nome"
                                    value={nome}
                                    onChange={(ev) => {
                                        setNome(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    variant="outlined"
                                    color="primary"
                                    label="Email"
                                    value={email}
                                    onChange={(ev) => {
                                        setEmail(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="UserName"
                                    value={userName}
                                    onChange={(ev) => {
                                        setUserName(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={confirmPassword}
                                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    label="Confirm password"
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
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Button variant="text" onClick={() => {
                                        props.closeRegisterModal();
                                        props.handleRefresh()
                                    }}>
                                        CANCELAR
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            createNewUser()
                                            props.handleRefresh()
                                        }}
                                    >
                                        CADASTRAR
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {showMessage ? (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert
                                onClose={() => {
                                    setDefinedMessage('')
                                    dispatch({ type: CLEAR_USER })
                                }}
                            >
                                {definedMessage}
                            </Alert>
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Box>
            </Modal>
        </div>
    )
}