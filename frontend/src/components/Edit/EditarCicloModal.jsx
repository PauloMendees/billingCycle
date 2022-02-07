import { Modal, Typography, Box, Grid, Button, TextField } from '@mui/material';
import { formatMuiErrorMessage } from '@mui/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR } from '../../constants/billingCycle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import putCicle from './putCicle';

export default function EditarCicloModal(props) {
    const dispatch = useDispatch()
    const message = useSelector(state => state.ciclos.message)
    const [alteredName, setAlteredName] = useState('')
    const [alteredMonth, setAlteredMonth] = useState()
    const [alteredYear, setAlteredYear] = useState()
    const [definedMessage, setDefinedMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        setAlteredName(props.clickedName)
        setAlteredMonth(props.clickedMonth)
        setAlteredYear(props.clickedYear)
        dispatch({ type: CLEAR })
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

    function salvarAlteracoes() {
        const temp = {
            nome: alteredName,
            mes: alteredMonth,
            ano: alteredYear
        }
        dispatch(putCicle(props.clickedId, temp))
    }

    return (
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
                    {props.clickedName}
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
                                helperText="Mês"
                                type="number"
                                value={alteredMonth}
                                onChange={(ev) => {
                                    setAlteredMonth(ev.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                color="primary"
                                helperText="Ano"
                                type="number"
                                value={alteredYear}
                                onChange={(ev) => {
                                    setAlteredYear(ev.target.value)
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
                                    props.handleCloseEditModal();
                                }}>
                                    CANCELAR
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        salvarAlteracoes()
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
    )
}