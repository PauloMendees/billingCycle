import React, {useEffect, useState} from 'react';
import { Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CLEAR_CREDIT } from '../../constants/creditos';
import cadastrarCredito from './CadastrarCredito';

export default function CadastroCredito(props) {
    const message = useSelector((state) => state.credit.message)
    const [nome, setNome] = useState('');
    const [value, setValue] = useState();
    const [definedMessage, setDefinedMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const dispatch = useDispatch();
    function createNewCredit(nome, value){
        const credito= {
            nome: nome,
            value: value,
            billingCycleId: props.cicloId,
        }
        dispatch(cadastrarCredito(credito))
    }

    useEffect(() => {
        if(message !== null){
            setDefinedMessage(message)
        }
    }, [message])

    useEffect(() => {
        if(definedMessage === "Crédito cadastrado com sucesso"){
            setShowMessage(true)
        }else{
            setShowMessage(false)
        }
    }, [definedMessage])

    return (
        <div>
            <Modal
                open={props.registerCredit}
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
                                    label="Nome do débito"
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
                                    label="Valor"
                                    type="number"
                                    value={value}
                                    onChange={(ev) => {
                                        setValue(ev.target.value)
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
                                            createNewCredit(nome, value)
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
                                    dispatch({type: CLEAR_CREDIT})
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