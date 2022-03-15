import { createSlice } from '@reduxjs/toolkit'

let listId = 3;


export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        users: [
            {
                userId: 0,
                name: "John",
                email: "userJohn@mail.ru"
            },
            {
                userId: 1,
                name: "Jack",
                email: "userJack@mail.ru"
            },
            {
                userId: 2,
                name: "Nick",
                email: "userNick@mail.ru"
            },
        ],

        lists: [
            {
                title: "IN PROGRESS",
                listId: 0,
                cards: [
                    {
                        usersCard: [
                            0,
                            1,
                            2
                        ],
                        userId: 2,
                        id: 3724585,
                        text: "class ",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 0,
                        id: 8757487,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            
                        ],
                        userId: 1,
                        id: 8743098,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            2
                        ],
                        userId: 0,
                        id: 8787779, 
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                ]
            },
            {
                title: "TO DO",
                listId: 1,
                cards: [
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 0,
                        id: 5465765,
                        text: "created static 1",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 0,
                        id: 21334344,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 2,
                        id: 34656723,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 0,
                        id: 56324235,
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 1,
                        id: 2436653,
                        text: "created static 5",
                        description: "description 5",
                        time: "10.03.2022 21:36"
                    }
                ]
            },
            {
                title: "TO DO2",
                listId: 2,
                cards: [
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 0,
                        id: 7654325,
                        text: "created static 6",
                        description: "description 6",
                        time: "10.03.2022 21:36"
                    },
                    {
                        usersCard: [
                            0,
                            1
                        ],
                        userId: 2,
                        id: 4665734,
                        text: "created static 7",
                        description: "description 7",
                        time: "10.03.2022 21:36"
                    },

                ]
            },
        ]
    },
    reducers: {

        sort(state, action) {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type,
                move
            } = action.payload;

            if (type === "list") {
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (move === true) {
                const indexCardStart = state.lists[action.payload.indexStart].cards.findIndex(card => card.id === action.payload.id)
                const moveCard = state.lists[action.payload.indexStart].cards.splice(indexCardStart, 1)
                const indexCardEnd = state.lists[action.payload.indexEnd]  
                indexCardEnd.cards.push(...moveCard)
            }

            if (droppableIdStart !== "all-lists" && droppableIdStart === droppableIdEnd && move !== true) {
                const list = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }
        },

        addList(state, action) {
            const newList = {
                title: action.payload.text,
                listId: listId,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }
        },

        addCard(state, action) {
            const newCard = {
                userId: 0,
                id: Date.now(),
                text: action.payload.text,
                description: action.payload.desc,
                time: action.payload.time
            }
            return {...state, lists: state.lists.map(list => list.listId === action.payload._id ? { ...list, cards: [...list.cards, newCard]} : list)}
        },

        changeCardText(state, action) {
            state.lists[action.payload.indexList].cards = state.lists[action.payload.indexList].cards.map(card => ({
                ...card,
                text: card.id === action.payload.id ? action.payload.text : card.text
            }))
        },

        changeCardDesc(state, action) {
            state.lists[action.payload.indexList].cards = state.lists[action.payload.indexList].cards.map(card => ({
                ...card,
                description: card.id === action.payload.id ? action.payload.desc : card.description
            }))
        },

        changeListTitle(state, action) {
            state.lists[action.payload._id].title = action.payload.titleText
        },
    },
})

export const { addList, addCard, sort, changeCardText, changeCardDesc, changeListTitle } = listsSlice.actions
export default listsSlice.reducer;

