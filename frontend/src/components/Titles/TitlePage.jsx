import { Breadcrumbs, Stack } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function TitlePage(props){
    return(
        <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                {props.itens}
            </Breadcrumbs>
        </Stack>
    )
}