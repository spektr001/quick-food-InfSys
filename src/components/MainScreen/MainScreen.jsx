import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ItemBlock } from './ItemBlock';
/* import clsObj from './mainscreen.module.scss' */

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const MainScreen = () => {
    return (
        <Box sx={{ flexGrow: 1, margin: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <ItemBlock />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

