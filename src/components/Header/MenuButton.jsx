import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import { db } from '../../firebase-config'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { shopList } from '../MainScreen/MainScreen';

export function MenuButton() {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openM, setOpenM] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [openSnackSold, setOpenSnackSold] = React.useState(false);
  const [pass, setPass] = React.useState('');
  const [data, setData] = React.useState({});
  let navigate = useNavigate();

  useEffect(
    () => {
      async function fetchData() {
        const querySnapshots = doc(db, 'food', 'admin')
        const mySnap = await getDoc(querySnapshots)
        setData(mySnap.data())
      }
      fetchData()
    }, []);

  const handleMCheck = () => {
    if (pass === data.password) {
      alert('success')
      setPass('')
      setOpenM(false)
      navigate('/adminPanel')
    }
    else {
      alert('error')
    }
  };

  const priceArr = []


  let shopListReady = shopList.map((p) => {
    priceArr.push(p.price)
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            {p.type}
          </ListItem>
          <ListItem disablePadding>
            {p.title}
          </ListItem>
          <ListItem disablePadding>
            {"Ціна: " + p.price + " грн"}
          </ListItem>
        </List>
        <Divider />
      </Box>
    )
  })

  const sum = () => {
    let sum = 0;
    for (let i = 0; i < priceArr.length; i++) {
      sum += priceArr[i];
    }
    return sum
  }

  const sendList = () => {
    shopList.forEach(async (element) => {
      await updateDoc(doc(db, 'food', 'orders'), {
        orderList:
          arrayUnion({
            type: element.type,
            title: element.title,
            price: element.price
          })
      })
    });
    shopList.length = 0
    handleOpenSnackSold()
  };


  const handleChange = (e) => {
    setPass(e.target.value)
  }


  const handleClickMOpen = () => {
    setOpenM(true);
  };

  const handleMClose = () => {
    setOpenM(false);
  };

  const handleClickSOpen = () => {
    setOpenS(true);
  };

  const handleSClose = () => {
    setOpenS(false);
  };

  const handleOpenSnackSold = () => {
    setOpenSnackSold(true);
  };

  const handleCloseSnackSold = () => {
    setOpenSnackSold(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClickSOpen}>Список покупок</MenuItem>
                      <MenuItem onClick={handleClickMOpen}>AdminPanel</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>

      <Dialog open={openM} onClose={handleMClose}>
        <DialogTitle>AdminPanel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Введіть адмін-пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMClose}>Назад</Button>
          <Button onClick={handleMCheck}>Підтвердити</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openS} onClose={handleSClose}>
        <DialogTitle>Корзина</DialogTitle>
        <DialogContent>
          {shopListReady}
          <font size="5">До сплати: {sum()} грн</font>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSClose}>Назад</Button>
          <Button onClick={sendList} color="success">Підтвердити</Button>
          <Button onClick={() => { shopList.length = 0 }} color="error">Відміна</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
                open={openSnackSold}
                autoHideDuration={6000}
                onClose={handleCloseSnackSold}
                message="Ваше замовлення відправлено. Дякуємо за покупку"
            />
    </>
  );
}