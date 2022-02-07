import { Typography, Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitlePage from '../../components/Titles/TitlePage';
import ValueBox from '../../components/ValueBox';
import DebitTable from '../../components/Tables/DebitTable';
import TableTitle from '../../components/Titles/TableTitle';
import CreditTable from '../../components/Tables/CreditTable';
import { useSelector } from 'react-redux';
import CadastroDebito from '../../components/Cadastro/CadastroDebito';
import CadastroCredito from '../../components/Cadastro/CadastroCredito';
import buscarCiclo from '../../components/Tables/requests/buscarCiclo';

export default function CicloUnitario() {
    const { id } = useParams()

    const [registerDebit, setRegisterDebit] = useState(false);
    const [registerCredit, setRegisterCredit] = useState(false);
    const [refresh, setRefresh] = useState(true)
    function handleRefresh() {
        setRefresh(!refresh);
    }

    function openRegisterDebitModal() {
        setRegisterDebit(true);
    }

    function closeRegisterDebitModal() {
        setRegisterDebit(false);
    }

    function openRegisterCreditModal() {
        setRegisterCredit(true);
    }
    function closeRegisterCreditModal() {
        setRegisterCredit(false);
    }

    const nome = useSelector((state) => state.ciclos.billingCycleAtual.nome)
    const debitos = useSelector((state) => state.ciclos.billingCycleAtual.debitos)
    const [definedDebit, setDefinedDebit] = useState(0)
    const creditos = useSelector((state) => state.ciclos.billingCycleAtual.creditos)
    const [definedCredit, setDefinedCredit] = useState(0)

    const links = [
        <Link to="/ciclos" style={{ textDecoration: 'none' }}>
            <Typography variant="h4" color="primary" >Ciclos</Typography>
        </Link>,
        <Link to={`/ciclounitario/${id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h4" color="primary" >{nome}</Typography>
        </Link>,
    ]

    React.useEffect(() => {
        if (debitos !== undefined) {
            let temp = 0;
            for (var i = 0; i < debitos.length; i++) {
                temp = temp + debitos[i].value
            }
            setDefinedDebit(temp)
        }
        if (creditos !== undefined) {
            let temp = 0;
            for (var i = 0; i < creditos.length; i++) {
                temp = temp + creditos[i].value
            }
            setDefinedCredit(temp)
        }
    }, [debitos, creditos])
    return (
        <>
            <Box sx={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                <TitlePage itens={links} />
                <Box sx={{ marginTop: 5 }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}>
                        <ValueBox color="#8B0000" valor={definedDebit} />
                        <ValueBox color="#005C8A" valor={definedCredit - definedDebit} />
                        <ValueBox color="#008000" valor={definedCredit} />
                    </Box>
                    <Box sx={{
                        margin: '15px',
                        backgroundColor: '#f5f5f5',
                        padding: 3,
                        borderRadius: 2
                    }}>
                        <Box sx={{
                            marginTop: 3
                        }}>
                            <Grid container spacing={10}>
                                <Grid item xs={6}>
                                    <TableTitle variant={false} color="#8B0000" openRegisterModal={openRegisterDebitModal} registerDebit={registerDebit} handleRefresh={handleRefresh} />
                                    <DebitTable cycleId={id} refresh={refresh} handleRefresh={handleRefresh} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TableTitle variant={true} color="#008000" openRegisterModal={openRegisterCreditModal} registerCredit={registerCredit} handleRefresh={handleRefresh} />
                                    <CreditTable cycleId={id} refresh={refresh} handleRefresh={handleRefresh} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <CadastroDebito cicloId={id} registerDebit={registerDebit} closeRegisterModal={closeRegisterDebitModal} handleRefresh={handleRefresh} />
            <CadastroCredito cicloId={id} registerCredit={registerCredit} closeRegisterModal={closeRegisterCreditModal} handleRefresh={handleRefresh} />
        </>
    )
}