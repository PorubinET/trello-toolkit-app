import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import TrelloCard from "../trelloCards/trelloCard"
import TrelloActionButton from "../TrelloActionButton/TrelloActionButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { changeListTitle } from "../../store/listsSlice"
import TextField from '@mui/material/TextField';
import styled from "styled-components"


import "./trelloList.scss"

const ListContainer = styled.div`
    background-color: #d8dde0;
    border-radius: 3px;
    max-width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
  `;

const TrelloList = ({ title, cards, _id, index, position }) => {

  let [titleText, setTitle] = useState(title);
  const dispatch = useDispatch();

  const changeTitleText = (e) => {
    setTitle(titleText = e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      dispatch(changeListTitle({_id, titleText}))
    }
  }

  return (
    <Draggable draggableId={String(_id)} position={position} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(_id)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Grid style={{ display: "flex" , justifyContent: "space-between"}}>
                  <TextField          
                    margin="dense"
                    label="Rename"
                    variant="standard"
                    type="text"
                    fullWidth
                    value={titleText}
                    onKeyDown={handleKeyDown}
                    onChange={changeTitleText}
                    style={{readOnly: true}}
                  />
                    <MoreHorizIcon />
                </Grid>
                {cards.map((card, indexCard) =>
                  <Grid item xs={12} key={card.id} cards={cards} >
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      desc={card.description}
                      listId={card.listId}
                      time={card.time}
                      userId={card.userId}
                      index={indexCard}
                      indexList={index}
                      cards={cards}
                      usersCard={card.usersCard.map(uCard => uCard)}
                    />
                  </Grid>
                )}
                {provided.placeholder}
                <TrelloActionButton
                  _id={_id}
                />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  )
}

export default TrelloList

