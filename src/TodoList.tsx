import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


function TodoList(props: TodoListPropsType) {
    const addTask = (title: string) => props.addTask(title, props.id)

    const all = () => {
        props.changeFilter('all', props.id)
    }
    const active = () => {
        props.changeFilter('active', props.id)
    }
    const completed = () => {
        props.changeFilter('completed', props.id)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.id)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"secondary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton size={"small"} onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton
                        size={"small"}
                        color={"secondary"}
                        onClick={() => {props.removeTodoList(props.id)}}>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: "none", paddingLeft: "0"}}>
                    {tasks}
                </ul>
                <div>
                    <Button
                        size={'small'}
                        variant={"contained"}
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={all}>All
                    </Button>
                    <Button
                        size={'small'}
                        variant={"contained"}
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={active}>Active
                    </Button>
                    <Button
                        size={'small'}
                        variant={"contained"}
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={completed}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;