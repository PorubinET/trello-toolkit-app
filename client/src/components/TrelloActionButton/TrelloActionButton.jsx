import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { addList, addCard} from "../../store/listsSlice"
import { Button, Icon } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import TextareaAutosize from 'react-textarea-autosize';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from "moment"
import "./TrelloActionButton.scss"


function TrelloActionButton(props) {
    let [formOpen, setForm] = useState(true)
    let [text, setText] = useState("")

    const time = moment().format("DD.MM.YYYY HH:mm");
    const dispatch = useDispatch();
    const {list, _id } = props
    const buttonTextOpacity = list ? 1 : 0.5;

    const buttonText = list
        ? "Add a list"
        : "Add a card";

    const buttonTextColor = list
        ? "while"
        : "inherit";

    const buttonTextBackground = list
        ? "rgba(0,0,0,.15)"
        : "inherit";

    const placeholder = list
        ? "Enter list title..."
        : "Enter a title for this card..."

    const buttonTitle = list
        ? "Add List"
        : "Add Card"

    const openForm = (e) => {
        e.preventDefault();
        setForm(formOpen === false ? true : false)
    }

    const handleInputChange = (e) => {
        setText(text = e.target.value.replace(/ +/g, ' '))
    }

    const createList = (e) => {
        e.preventDefault();
        if(text === " " || text === "" ){
            alert("пустое поле")   
        }
        else {
            dispatch(addList({text}))
            setText(text = "")
        }
    }

    const createCard = (e) => {
        e.preventDefault();
        if(text === " " || text === "" ){
            alert("пустое поле")   
        }
        else {
            dispatch(addCard({_id, text, time, desc: ""}))
            setText(text = "")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          createCard(e)
        }
    }

    const styles = {
        openFormButtonGroup: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: 3,
            height: 36,
            width: 272,
            paddingleft: 10,
        },
        formButtonGroup: {
            marginTop: 8,
            display: "flex",
            alignItems: "center"
        }
    }

    return (
        formOpen ? 
            <div className="btn"
                onClick={openForm}
                style = {
                   { ...styles.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground}
                }
                >
                <AddIcon/>
                <p>{buttonText}</p>
            </div>

            :

            <div>
                <Card style={{
                    minHeight: 80,
                    minWidth: 272,
                    marginTop: 16,
                    marginBottom: 16,
                    padding: "8px, 8px, 2px"
                }}>
                    <TextareaAutosize
                        placeholder={placeholder}
                        onBlur={openForm}
                        value={text}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        autoFocus
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.openFormButtonGroup}>
                    <Button
                        onMouseDown={list ? createList : createCard}
                        variant="contained"
                        style={{
                            color: "while",
                            backgroundColor: "#5aac44"
                        }}>
                        {buttonTitle}
                    </Button>
                    <Icon style={{
                        marginLeft: 8,
                        cursor: "pointer",
                    }}>
                        <CancelIcon 
                            onClick={openForm}
                        />
                    </Icon>
                </div>
            </div>
    )
}


export default TrelloActionButton;
