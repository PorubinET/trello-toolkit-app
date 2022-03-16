import React from "react"
import TrelloList from "../trelloList/trelloList"
import Sidebar from "../sidebar/sidebar"
import { useSelector } from 'react-redux'
import TrelloActionButton from "../TrelloActionButton/TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { sort } from "../../store/listsSlice"
import styled from "styled-components"
import './App.css';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: rgb(0, 0, 0);
    margin-top: 5rem;
  `;

function App() {
  const dispatch = useDispatch();
  
  const lists = useSelector(state => state.lists.lists)
  console.log(lists, "lists<<<<<")
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return;

    dispatch(sort(
      {
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexEnd: destination.index,
      droppableIndexStart: source.index,
      draggableId: draggableId,
      type: type
      }
    ))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            <Sidebar />
            {lists.map((list, index) =>  
              <TrelloList
                _id={list.listId}
                key={list.listId}
                title={list.title}
                cards={list.cards}
                name={list.name}
                email={list.email}
                index={index}
              />
            )}
            {provided.placeholder}
            <TrelloActionButton list />
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}


export default App;
