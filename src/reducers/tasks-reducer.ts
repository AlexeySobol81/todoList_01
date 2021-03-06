import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {Simulate} from "react-dom/test-utils";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string

}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todoListId: string
    isDone: boolean
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todoListId: string
    title: string
}

let initialState: TaskStateType = {}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export function tasksReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task =>
                task.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            let todoListId = action.todoListId
            return {...state, [action.todoListId]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState [action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todoListId: todoListId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId}
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todoListId}
}