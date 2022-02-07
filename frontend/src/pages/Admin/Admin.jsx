import React, { useState } from 'react';
import TitlePage from '../../components/Titles/TitlePage';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import UserTable from '../../components/Tables/UserTable';
import CadastrarUsuario from '../../components/Cadastro/CadastrarUsuario';

export default function Admin() {
    const links = [
        <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Typography variant="h4" color="primary" >Admin</Typography>
        </Link>,
    ]

    const [filter, setFilter] = useState('')
    const [registerModal, setRegisterModal] = useState(false)
    const [refresh, setRefresh] = useState(false)

    function openRegisterModal() {
        setRegisterModal(true)
    }

    function closeRegisterModal() {
        setRegisterModal(false)
    }

    function handleRefresh() {
        setRefresh(!refresh)
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
                            ADICIONAR USUÁRIO
                        </Button>
                    </Box>
                    <Box sx={{
                        padding: 1,
                        marginTop: 3
                    }}>
                        <UserTable refresh={refresh} handleRefresh={handleRefresh} filter={filter} />
                    </Box>
                </Box>
            </Box>
            <CadastrarUsuario registerModal={registerModal} closeRegisterModal={closeRegisterModal} handleRefresh={handleRefresh}/>
        </>
    )
}