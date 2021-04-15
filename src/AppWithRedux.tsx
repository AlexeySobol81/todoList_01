import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()

    //functions for tasks
    function addTask(taskTitle: string, todoListID: string) {
       let action = addTaskAC(taskTitle, todoListID)
        dispatch(action)
    }
    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }

    //functions for todoList:
    function changeFilter(newFilterValue: FilterValueType, todoListID: string) {
        let action = ChangeTodoListFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(todoListID, newTitle)
        dispatch(action)
    }
    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)
    }

    //UI:
    const todoListComponents = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>)
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
