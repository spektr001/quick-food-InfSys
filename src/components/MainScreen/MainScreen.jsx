import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import pizza from '../../assets/icons/pizza.png'
import sushi from '../../assets/icons/sushi.png'
import hotDog from '../../assets/icons/hot-dog.png'
import fri from '../../assets/icons/fri.png'
import burger from '../../assets/icons/burger.png'
import soda from '../../assets/icons/soda.png'
import clsObj from './mainscreen.module.scss'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const shopList = []

export const MainScreen = () => {

    const [data, setData] = useState([]);

    useEffect(
        () => {
            async function fetchData() {
                const querySnapshots = doc(db, 'food', 'foodList')
                const mySnap = await getDoc(querySnapshots)
                setData(mySnap.data().food)
            }
            fetchData()
        }, []);

    const foodBlocks = []

    for (let i = 0; i < data.length; i++) {
        const addToShopList = () => {
            shopList.push(
                {
                    type: data[i].type,
                    title: data[i].title,
                    price: data[i].price
                }
            )
        }

        foodBlocks.push(
            <Grid item xs={4}>
                <Item>
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="sm" className={clsObj.foodBlock}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <img width="100px" src={
                                    data[i].type === "Піцца" ? pizza :
                                        data[i].type === "Суші" ? sushi :
                                            data[i].type === "Хот-дог" ? hotDog :
                                                data[i].type === "Картопля-фрі" ? fri :
                                                    data[i].type === "Бургер" ? burger :
                                                        data[i].type === "Напій" ? soda : null
                                } alt="food-img" />
                                <span className={clsObj.foodTitle}>{data[i].type}</span>
                                <span className={clsObj.foodTitle}>{data[i].title}</span>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}>
                                <span className={clsObj.foodPrice}>Ціна: {data[i].price} грн</span>
                                <Button onClick={addToShopList} size="small" color="success" variant="contained"><AddOutlinedIcon /></Button>
                            </Box>
                        </Container>
                    </React.Fragment >
                </Item>
            </Grid>
        )

    }

    return (
        <main>
            <Box sx={{ flexGrow: 1, margin: 5 }}>
                <Grid container spacing={2}>
                    {foodBlocks}
                </Grid>
            </Box>
        </main>
    );
}

