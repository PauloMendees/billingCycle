import * as React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import buscarCiclo from './requests/buscarCiclo';
import DeleteIcon from '@mui/icons-material/Delete';
import deletarDebito from './requests/deleteDebit'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditarDebitoModal from '../../components/Edit/EditarDebitoModal'
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

function createData(name, calories, fat) {
    return { name, calories, fat };
}

export default function DebitTable(props) {
    const billingCycle = useSelector((state) => state.ciclos.billingCycleAtual.debitos)
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [debitos, setDebitos] = React.useState([
        {
            billingCycle: {},
            billingCycleId: 53,
            id: 2,
            nome: "Cartão",
            status: "Pago",
            value: 500
        }
    ])
    const [showTable, setShowTable] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [refresh, setRefresh] = React.useState(false)
    const [clickedNome, setClickedNome] = React.useState('')
    const [clickedValue, setClickedValue] = React.useState()
    const [clickedStatus, setClickedStatus] = React.useState('')
    const [clickedId, setClickedId] = React.useState('')
    const [cicloId, setCicloId] = React.useState()

    function HandleRefresh() {
        setRefresh(!refresh)
    }

    function handleOpenEditModal() {
        setOpenEditModal(true)
    }

    function handleCloseEditModal() {
        setOpenEditModal(false)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - debitos.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        dispatch(buscarCiclo(props.cycleId))
    }, [])

    
    React.useEffect(() => {
        dispatch(buscarCiclo(props.cycleId))
    }, [refresh])

    React.useEffect(() => {
        dispatch(buscarCiclo(props.cycleId))
    }, [props.refresh])

    React.useEffect(() => {
        if (billingCycle !== undefined) {
            setDebitos(billingCycle)
        }
    }, [billingCycle])

    return (
        <>
            <TableContainer>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="tr" scope="row" align="left">
                                <b style={{ color: '#B22222' }}>Nome</b>
                            </TableCell>
                            <TableCell component="tr" scope="row" align="center">
                                <b style={{ color: '#B22222' }}>Valor</b>
                            </TableCell>
                            <TableCell component="tr" scope="row" align="right">
                                <b style={{ color: '#B22222' }}>Status</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? debitos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : debitos
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" align="left">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={(ev) => {
                                                setClickedNome(row.nome)
                                                setClickedValue(row.value)
                                                setClickedId(row.id)
                                                setClickedStatus(row.status)
                                                setCicloId(row.billingCycleId)
                                                handleOpenEditModal();
                                            }}
                                        >
                                            <BorderColorIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={(ev) => {
                                                dispatch(deletarDebito(row.id))
                                                props.handleRefresh()
                                            }}
                                        >
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                        {row.nome}
                                    </Box>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.value}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.status}
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
                                count={debitos.length}
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
            <EditarDebitoModal
                clickedNome={clickedNome}
                clickedValue={clickedValue}
                clickedStatus={clickedStatus}
                clickedId={clickedId}
                cicloId={cicloId}
                openEditModal={openEditModal}
                handleCloseEditModal={handleCloseEditModal}
                HandleRefresh={HandleRefresh} />
        </>
    );
}