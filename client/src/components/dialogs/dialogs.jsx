import * as React from 'react';
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { changeCardText, changeCardDesc, sort, deleteUser } from "../../store/listsSlice"

import "./dialogs.scss";

export default function FormDialog({ text, id, desc, time, indexList, usersCard }) {

  let [move, setMove] = useState(false)
  let [openCard, setOpen] = useState(false);
  let [userInfo, setUserInfo] = useState(0)
  let [profOpen, setProfOpen] = useState(false)
  let [usersProfOpen, setUsersProfOpen] = useState(false)
  let [textCard, setTextCard] = useState(text);
  let [descCard, setDescCard] = useState(desc);

  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.lists)
  const users = useSelector(state => state.lists.users)

  const cUsers = usersCard.map(uCard => users.filter(element => element.userId === uCard)[0])
  const currentUser = cUsers.find(cUser => cUser.userId === userInfo)


  const clickProfOpen = () => { setProfOpen(profOpen ? false : true) }
  const clickUsersProfOpen = () => { setUsersProfOpen(usersProfOpen ? false : true) }
  const dragCard = () => { setMove(move === true ? false : true) }
  const handleClickOpen = () => { setOpen(openCard === true ? false : true) }
  const changeText = (e) => { setTextCard(textCard = e.target.value) }
  const changeDesc = (e) => { setDescCard(textCard = e.target.value) }

  

  const getUser = (id) => {
    setUserInfo(id)
    setProfOpen(profOpen ? false : true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setDate()
    }
  }

  const remove = (id) => {
    dispatch(deleteUser({id, indexList}))
  }

  const setDate = () => {
    dispatch(changeCardText({ id, indexList, text: textCard }))
    dispatch(changeCardDesc({ id, indexList, desc: descCard }))
    handleClickOpen()
  }

  const moveCard = (indexEnd) => {
    if (indexList === indexEnd) { alert("выберите другой лист") }
    dispatch(sort({ indexStart: indexList, id, indexEnd, move }))
  }

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <EditIcon className="card__icon" />
      <div className="card__wrapp" onClick={handleClickOpen}></div>
      <Typography>
        <span className="card__text-wrapp">{text}</span>
      </Typography>

      <Dialog open={openCard} onClose={handleClickOpen}>
        <Typography style={{ textAlign: "right", marginRight: "24px", marginTop: "6px" }}>
          Members
        </Typography>

        <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
          <Dialog open={move} onClose={dragCard}>
            {lists.map((list, index) =>
              <Button
                key={index}
                index={index}
                onClick={() => moveCard(index)}
              >
                {list.title}
              </Button>
            )}
          </Dialog>

          <TextField
            margin="dense"
            label="Rename"
            variant="standard"
            type="text"
            id={String(id)}
            fullWidth
            value={textCard}
            onKeyDown={handleKeyDown}
            onChange={changeText}
            style={{ width: "30%" }}
          />
          <Grid style={{ display: "flex" }}>

            {cUsers.map((cUser, index) =>
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={() => getUser(cUser.userId)}>
                    <Avatar sx={{ bgcolor: red[500], width: "34px", height: "34px", pading: "0", margin: "0" }} aria-label="recipe">
                      {cUser.name[0]}
                    </Avatar>
                  </IconButton>

                }
                key={index}
                style={{ textAlign: "right", padding: "0px", margin: "0px" }}
              />
            )}

            <Grid>
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={clickUsersProfOpen}>
                    <Avatar sx={{ bgcolor: red[10], width: "34px", height: "34px" }} aria-label="recipe">
                      +
                    </Avatar>
                  </IconButton>
                }
                style={{ textAlign: "right", padding: "0px", margin: "0px" }}
              />
            </Grid>
          </Grid>


          <Dialog open={profOpen} onClose={clickProfOpen}>

            <Card sx={{ maxWidth: 345 }}>
              <CardContent style={{ width: "320px", display: "flex", justifyContent: "space-between" }}>
                <Grid style={{ textAlign: "left" }}>
                  <Typography variant="body2" color="text.secondary">
                    <span>{currentUser.name === undefined ? "no" : currentUser.name}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>{currentUser.email === undefined ? "no" : currentUser.email}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>8989-888-88-88</span>
                  </Typography>
                </Grid>
                <Grid>
                  <Avatar sx={{ bgcolor: red[500], width: "40px", height: "40px" }} aria-label="recipe">
                    {currentUser.name[0] === undefined ? "no" : currentUser.name[0]}
                  </Avatar>
                </Grid>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button size="small" onClick={clickProfOpen}>Close</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>

          </Dialog>

          <Dialog open={usersProfOpen} onClose={clickUsersProfOpen}>

            <Card sx={{ maxWidth: 385 }}>
              {users.map((cUser, index) =>
                <CardContent key={index} style={{ width: "385px", display: "flex", justifyContent: "space-between" }}>
                  <Grid style={{ textAlign: "left" }}>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "12px" }}>
                      <span>{cUser.name === undefined ? "no" : cUser.name}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "12px" }}>
                      <span>{cUser.email === undefined ? "no" : cUser.email}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: "12px" }}>
                      <span>8989-888-88-88</span>
                    </Typography>
                  </Grid>
                  <Grid style={{display: "flex"}}>
                    <Button size="small" onClick={() => remove(cUser.userId)}>Del</Button>
                    <Button size="small">Add</Button>
                    <CardHeader
                      action={
                        <IconButton aria-label="settings">
                          <Avatar sx={{ bgcolor: red[500], width: "34px", height: "34px" }} aria-label="recipe">
                            {cUser.name[0] === undefined ? "no" : cUser.name[0]}
                          </Avatar>
                        </IconButton>
                      }
                      style={{ textAlign: "right", padding: "0px", margin: "0px" }}
                    />
                  </Grid>
                </CardContent>
              )}
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button size="small" onClick={clickUsersProfOpen}>Close</Button>
                <Button size="small">Add User</Button>
              </CardActions>
            </Card>

          </Dialog>

        </DialogTitle>

        <DialogContent style={{ width: 550, minHeight: 240 }}>
          <Grid
            marginTop={2}
            display="flex"
            flexDirection="column"
          >
            <TextField
              type="text"
              onChange={changeDesc}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={descCard}
              style={{ width: "100%", marginBottom: "10px" }}
              multiline
            />
            <div className="dialog__file-wrapp">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Button onClick={open}>Add File</Button>
              </div>
              <aside>
                <ul>{files}</ul>
              </aside>
            </div>
          </Grid>
        </DialogContent>

        <span className='dialogs__time'>{time}</span>
        <DialogActions>
          <Button onClick={dragCard}>move card</Button>
          <Button onClick={handleClickOpen}>Close</Button>
          <Button onClick={setDate}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}