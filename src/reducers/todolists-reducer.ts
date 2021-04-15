import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}

let initialState: Array<TodolistType> = []

export type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

export function todolistsReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            const newTodoList: TodolistType = {id: action.todoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        }
        case "CHANGE-FILTER": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todoListId: v1()}
}
export const ChangeTodoListFilterAC = (todoListId: string, filter: FilterValueType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: todoListId}
}
export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListId}
}
export const ChangeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE", title: title, id: todoListId}
}