import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase-config';

export function AdminPanel() {

    const [data, setData] = useState(["Loading..."]);
    const [openM, setOpenM] = useState(false);
    const [type, setType] = useState('Піцца');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(
        () => {
            async function fetchData() {
                const querySnapshots = doc(db, 'food', 'foodList')
                const mySnap = await getDocs(querySnapshots)
                setData(mySnap.data().food)
            }
            fetchData()
        }, []);

    const addItem = async () => {
        await updateDoc(doc(db, 'food', 'foodList'), {
            food: arrayUnion({
                type: type,
                title: title,
                price: Number(price)
            }) 
        });
    };

    const deleteItem = async () => {
        await updateDoc(doc(db, 'food', 'foodList'), {
            food: arrayRemove({
                type: type,
                title: title,
                price: Number(price)
            }) 
        });
    };

    const handleClickMOpen = () => {
        setOpenM(true);
    };

    const handleMClose = () => {
        setOpenM(false);
    };

    const handleType = (event) => {
        setType(event.target.value);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Button sx={{margin: 5}} onClick={handleClickMOpen} variant="contained">Змінити список товарів</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>

                                            <ListItemText primary="Inbox" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>

                                            <ListItemText primary="Drafts" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                            <Divider />
                            <nav aria-label="secondary mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary="Trash" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText primary="Spam" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Dialog open={openM} onClose={handleMClose}>
                <DialogTitle>Введіть елемент</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Назва"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleTitle}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Ціна"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handlePrice}
                        placeholder='0'
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Тип</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={type}
                            label="Тип"
                            onChange={handleType}
                        >
                            <MenuItem value={"Піцца"}>Піцца</MenuItem>
                            <MenuItem value={"Суші"}>Суші</MenuItem>
                            <MenuItem value={"Хот-Дог"}>Хот-Дог</MenuItem>
                            <MenuItem value={"Картопля-фрі"}>Картопля-фрі</MenuItem>
                            <MenuItem value={"Бургер"}>Бургер</MenuItem>
                            <MenuItem value={"Напій"}>Напій</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMClose}>Назад</Button>
                    <Button color="success" onClick={addItem}>Додати</Button>
                    <Button color="error" onClick={deleteItem}>Видалити</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}