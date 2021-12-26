import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
import { db } from '../../firebase-config'
import { doc, getDoc } from 'firebase/firestore';

export function MenuButton() {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openM, setOpenM] = React.useState(false);
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

  const handleChange = (e) => {
    setPass(e.target.value)
  }


  const handleClickMOpen = () => {
    setOpenM(true);
  };

  const handleMClose = () => {
    setOpenM(false);
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
                      <MenuItem onClick={handleClose}>Список покупок</MenuItem>
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
    </>
  );
}