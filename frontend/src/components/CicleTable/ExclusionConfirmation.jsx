import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import deletarCiclo from './deletarCiclo';
import { CLEAR } from '../../constants/billingCycle';

export default function ExclusionConfirmation({ openModal, handleModal, selectedCycle, handleRefresh }) {
    const dispatch = useDispatch()
    const message = useSelector((state) => state.ciclos.message)
    const [success, setSuccess] = useState(false)
    const [definedMessage, setDefinedMessage] = useState('')

    useEffect(() => {
        dispatch({type: CLEAR})
    }, [openModal])

    useEffect(() => {
        setDefinedMessage(message)
    }, [message])

    useEffect(() => {
        if (definedMessage.includes('sucesso')) {
            setSuccess(true)
            handleRefresh()
        } else {
            setSuccess(false)
        }
    }, [definedMessage])

    return (
        <Modal
            open={openModal}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 3,
                borderRadius: 3
            }}>
                {success ? (
                    <>
                        <Box sx={{
                            marginBottom: 4
                        }}>
                            <Typography id="modal-modal-title" variant="h5" component="h2" color="primary">
                                {definedMessage}
                            </Typography>
                        </Box>
                        <Button variant="contained" fullWidth onClick={handleModal}>
                            Voltar ?? lista
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography id="modal-modal-title" variant="h5" component="h2" color="primary">
                            Tem certeza?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Essa a????o ?? irrevers??vel e exclu??ra o ciclo, juntamente com todos d??bitos e cr??ditos inclusos nele.
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 4
                        }}>
                            <Button
                                onClick={() => {
                                    handleModal()
                                }}
                            >
                                CANCELAR
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    dispatch(deletarCiclo(selectedCycle))
                                }}
                            >
                                CONFIRMAR
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    )
}