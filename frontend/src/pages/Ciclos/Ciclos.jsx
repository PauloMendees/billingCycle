import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TitlePage from '../../components/Titles/TitlePage';
import SearchIcon from '@mui/icons-material/Search';
import CicleTable from '../../components/CicleTable/CicleTable';
import CadastrarCiclos from '../../components/Cadastro/CadastrarCiclos';

export default function Ciclos() {
    const links = [
        <Link to="/ciclos" style={{ textDecoration: 'none' }}>
            <Typography variant="h4" color="primary" >Ciclos</Typography>
        </Link>,
    ]

    const [registerModel, setRegisterModal] = useState(false);
    const [refresh, setRefresh] = useState(true)
    const [filter, setFilter] = useState('')
    function handleRefresh(){
        setRefresh(!refresh);
    }
    function openRegisterModal() {
        setRegisterModal(true);
    }
    function closeRegisterModal() {
        setRegisterModal(false);
    }

    return (
        <>
            <Box sx={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                <TitlePage itens={links} />
                <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '40vw' }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                variant="standard"
                                fullWidth color="primary"
                                label="Buscar..."
                                value={filter}
                                onChange={(ev) => {
                                    setFilter(ev.target.value)
                                }}
                            />
                        </Box>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{
                                padding: 1.3
                            }}
                            onClick={(ev) => {
                                openRegisterModal();
                            }}
                        >
                            ADICIONAR CICLO
                        </Button>
                    </Box>
                    <Box sx={{
                        padding: 1,
                        marginTop: 3
                    }}>
                        <CicleTable refresh={refresh} handleRefresh={handleRefresh} filter={filter}/>
                    </Box>
                </Box>
            </Box>
            <CadastrarCiclos registerModel={registerModel} closeRegisterModal={closeRegisterModal} refresh={refresh} handleRefresh={handleRefresh} />
        </>
    )
}