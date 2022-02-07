import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import listarCiclos from './listarCiclos';
import ExclusionConfirmation from './ExclusionConfirmation';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditarCicloModal from '../Edit/EditarCicloModal';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CicleTable({ refresh, handleRefresh, filter }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listaCiclos = useSelector((state) => state.ciclos.listaBillingCycle);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedCycle, setSelectedCycle] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listaCiclos.length) : 0;
    const [clickedName, setClickedName] = useState('')
    const [clickedMonth, setClickedMonth] = useState()
    const [clickedYear, setClickedYear] = useState()
    const [clickedId, setClickedId] = useState()

    const filterTable = listaCiclos.filter((item) => 
        item.nome.toLowerCase().includes(filter.toLowerCase())
    )

    function handleCloseEditModal() {
        setOpenEditModal(false)
    }

    function handleOpenEditModal() {
        setOpenEditModal(true)
    }

    function handleModal() {
        setOpenModal(!openModal)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(listarCiclos())
    }, [])

    useEffect(() => {
        dispatch(listarCiclos())
    }, [refresh])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <b>Nome do ciclo</b>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <b>Mês</b>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <b>Ano</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filterTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filterTable
                        ).map((row) => (
                            <TableRow key={row.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell component="th" scope="row" >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={(ev) => {
                                                setClickedName(row.nome)
                                                setClickedMonth(row.mes)
                                                setClickedYear(row.ano)
                                                setClickedId(row.id)
                                                handleOpenEditModal();
                                            }}
                                        >
                                            <BorderColorIcon color="primary" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={(ev) => {
                                                setSelectedCycle(row.id)
                                                handleModal()
                                            }}
                                        >
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                        <Box
                                            onClick={(ev) => {
                                                navigate(`/ciclounitario/${row.id}`, { replace: false })
                                            }}
                                            sx={{
                                                width: '100%'
                                            }}
                                        >
                                            {row.nome}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.mes}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.ano}
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={listaCiclos.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <ExclusionConfirmation openModal={openModal} selectedCycle={selectedCycle} handleModal={handleModal} handleRefresh={handleRefresh} />
            <EditarCicloModal
                openEditModal={openEditModal}
                handleCloseEditModal={handleCloseEditModal}
                clickedName={clickedName}
                clickedMonth={clickedMonth}
                clickedYear={clickedYear}
                clickedId={clickedId}
            />
        </div>
    )
}