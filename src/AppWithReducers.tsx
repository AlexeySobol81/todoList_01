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

function AppWithReducer() {
    //CRUD
    //BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
        ],
    })

    //functions for tasks
    function addTask(taskTitle: string, todoListID: string) {
       let action = addTaskAC(taskTitle, todoListID)
        dispatchTasks(action)
    }
    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchTasks(action)
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatchTasks(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchTasks(action)
    }

    //functions for todoList:
    function changeFilter(newFilterValue: FilterValueType, todoListID: string) {
        let action = ChangeTodoListFilterAC(todoListID, newFilterValue)
        dispatchTodoLists(action)
    }
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(todoListID, newTitle)
        dispatchTodoLists(action)
    }
    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
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

export default AppWithReducer;
