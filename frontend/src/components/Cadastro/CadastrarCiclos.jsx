import React, {useEffect, useState} from 'react';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import cadastrarCiclo from './cadastrarCycle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CLEAR } from '../../constants/billingCycle';

export default function CadastrarCiclos(props) {
    const [nome, setNome] = useState('');
    const [mes, setMes] = useState();
    const [ano, setAno] = useState();
    const dispatch = useDispatch();
    function createNewCycle(name, month, year){
        const cycle= {
            nome: name,
            mes: month,
            ano: year
        }
        dispatch(cadastrarCiclo(cycle));
    }
    const statusCodeResponse = useSelector((state) => state.ciclos.statusResponse)
    const [definedMessage, setDefinedMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {
        dispatch({type: CLEAR})
    }, [props.registerModel])

    useEffect(() => {
        if(statusCodeResponse === 201){
            setDefinedMessage("Ciclo criado com sucesso")
        }else{
            setDefinedMessage('')
        }
    }, [statusCodeResponse])

    useEffect(() => {
        if(definedMessage === "Ciclo criado com sucesso"){
            setShowMessage(true)
        }else{
            setShowMessage(false)
        }
    }, [definedMessage])

    return (
        <div>
            <Modal
                open={props.registerModel}
                onClose={props.closeRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                        Cadastrar ciclos
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
                                    label="Nome do ciclo"
                                    value={nome}
                                    onChange={(ev) => {
                                        setNome(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="Mês"
                                    type="number"
                                    value={mes}
                                    onChange={(ev) => {
                                        setMes(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="Ano"
                                    type="number"
                                    value={ano}
                                    onChange={(ev) => {
                                        setAno(ev.target.value)
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
                                    }}>
                                        CANCELAR
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            createNewCycle(nome, mes, ano)
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
                                    dispatch({type: CLEAR})
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