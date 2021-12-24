import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/icons/logo.png'
import clsObj from './header.module.scss'
import { MenuButton } from './MenuButton'

export const Header = () => {
    return (
        <header>
            <Box sx={{ flexGrow: 1 } }>
                <AppBar position="static">
                    <Toolbar className={clsObj.header}>
                        <img className={clsObj.logo} src={logo} alt="pizza-icon" />
                        <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <span className={clsObj.title}>QuickFood</span> 
                        </Typography>
                            <MenuButton />
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}
