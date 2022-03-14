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
import { changeCardText, changeCardDesc, sort } from "../../store/listsSlice"
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import "./dialogs.scss"

export default function FormDialog({ text, id, desc, time, indexList, userId }) {

  let [move, setMove] = useState(false)
  let [openCard, setOpen] = useState(false);
  let [profOpen, setProfOpen] = useState(false)
  let [textCard, setTextCard] = useState(text);
  let [descCard, setDescCard] = useState(desc);

  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.lists)
  const users = useSelector(state => state.lists.users)
  const currentUser = users.find(user => user.userId === userId)

  const changeText = (e) => { setTextCard(textCard = e.target.value) }
  const changeDesc = (e) => { setDescCard(textCard = e.target.value) }

  const handleClickOpen = () => {
    setOpen(openCard === true ? false : true);
  };

  const clickProfOpen = () => {
    setProfOpen(profOpen === true ? false : true)
  }

  const dragCard = () => {
    setMove(move === true ? false : true)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      setDate()
    }
  }

  const setDate = () => {
    dispatch(changeCardText({ id, indexList, text: textCard }))
    dispatch(changeCardDesc({ id, indexList, desc: descCard }))
    handleClickOpen()
  }

  const moveCard = (indexEnd) => {
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
          <Grid>

            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={clickProfOpen}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {currentUser.name[0]}
                  </Avatar>
                </IconButton>
              }
              title={currentUser.name}
              style={{ textAlign: "right" }}
            />

          </Grid>
          <Dialog open={profOpen} onClose={clickProfOpen}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent style={{ width: "320px", display: "flex", justifyContent: "space-between" }}>
                <Grid style={{ textAlign: "left" }}>
                  <Typography variant="body2" color="text.secondary">
                    <span>{currentUser.name}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>{currentUser.email}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>8989-888-88-88</span>
                  </Typography>
                </Grid>
                <Grid>
                  <Avatar sx={{ bgcolor: red[500], width: "60px", height: "60px" }} aria-label="recipe">
                    {currentUser.name[0]}
                  </Avatar>
                </Grid>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button size="small" onClick={clickProfOpen}>Close</Button>
                <Button size="small">Learn More</Button>
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