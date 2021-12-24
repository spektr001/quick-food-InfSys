import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import clsObj from './footer.module.scss'

export const Footer = () => {
    return (
        <footer>
            <Box sx={{ flexGrow: 1 } }>
                <AppBar position="static">
                    <Toolbar>
                        <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <span className={clsObj.title}>QuickFood</span> 
                        </Typography>
                            <a target="_blank " rel="noreferrer"  href="https://github.com/spektr001" className={clsObj.footerTxt}>by spektr001</a>
                    </Toolbar>
                </AppBar>
            </Box>
        </footer>
    );
}
