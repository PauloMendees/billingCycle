import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import buscarCreditos from './buscarCreditos';
import buscarDebitos from './buscarDebitos';
import { Box, Typography } from '@mui/material'
import ValueBox from '../ValueBox';
import TitlePage from '../Titles/TitlePage';

export default function DashBoard() {
    const dispatch = useDispatch()
    const creditos = useSelector(state => state.credit.listaCreditos)
    const debitos = useSelector(state => state.debit.listaDebitos)
    const [totalCredit, setTotalCredit] = useState()
    const [totalDebit, setTotalDebit] = useState()

    useEffect(() => {
        dispatch(buscarCreditos())
        dispatch(buscarDebitos())
    }, [])

    useEffect(() => {
        if (creditos !== undefined) {
            let temp = 0;
            for (var i = 0; i < creditos.length; i++) {
                temp = temp + creditos[i].value
            }
            setTotalCredit(temp)
        }
    }, [creditos])

    useEffect(() => {
        if (debitos !== undefined) {
            let temp = 0;
            for (var i = 0; i < debitos.length; i++) {
                temp = temp + debitos[i].value
            }
            setTotalDebit(temp)
        }
    }, [debitos])

    return (
        <Box sx={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
            <TitlePage itens={[<Typography variant="h4" color="primary" >DashBoard Geral</Typography>]} />
            <Box sx={{
                marginTop: 3,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <ValueBox color="#8B0000" valor={totalDebit} />
                <ValueBox color="#005C8A" valor={totalCredit - totalDebit} />
                <ValueBox color="#008000" valor={totalCredit} />
            </Box>
        </Box>
    )
}