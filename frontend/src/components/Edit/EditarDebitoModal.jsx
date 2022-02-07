import { Modal, Typography, Box, Grid, Button, TextField, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CLEAR } from '../../constants/debitos'
import putDebit from './putDebit';

export default function EditarCreditoModal(props) {
    const dispatch = useDispatch()
    const message = useSelector(state => state.debit.message)
    const [alteredName, setAlteredName] = useState('')
    const [alteredStatus, setAlteredStatus] = useState('')
    const [alteredValue, setAlteredValue] = useState()
    const [definedMessage, setDefinedMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    function SalvarAlteracoes() {
        const temp = {
            nome: alteredName,
            value: alteredValue,
            status: alteredStatus,
            billingCycleId: props.cicloId
        }
        dispatch(putDebit(props.clickedId, temp))
    }

    useEffect(() => {
        setAlteredName(props.clickedNome)
        setAlteredValue(props.clickedValue)
        setAlteredStatus(props.clickedStatus)
        dispatch({type: CLEAR})
    }, [props.openEditModal])

    useEffect(() => {
        if (message !== null) {
            setDefinedMessage(message)
        }
    }, [message])

    useEffect(() => {
        if (definedMessage.includes('sucesso')) {
            setShowMessage(true)
        } else {
            setShowMessage(false)
        }
    }, [definedMessage])

    return (
        <div>
            <Modal
                open={props.openEditModal}
                onClose={props.handleCloseEditModal}
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
                        Creditos {'>'} {props.clickedNome}
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
                                    value={alteredName}
                                    onChange={(ev) => {
                                        setAlteredName(ev.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="Status"
                                    select
                                    value={alteredStatus}
                                    onChange={(ev) => {
                                        setAlteredStatus(ev.target.value)
                                    }}
                                >
                                    <MenuItem value="Pago">PAGO</MenuItem>
                                    <MenuItem value="Não Pago">NÃO PAGO</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    label="Valor"
                                    type="number"
                                    value={alteredValue}
                                    onChange={(ev) => {
                                        setAlteredValue(ev.target.value)
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
                                        props.handleCloseEditModal()
                                        dispatch({ type: CLEAR })
                                    }}>
                                        CANCELAR
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            SalvarAlteracoes()
                                            props.HandleRefresh()
                                        }}
                                    >
                                        SALVAR
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
                                    dispatch({ type: CLEAR })
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