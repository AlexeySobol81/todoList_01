import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                label={"Title"}
                value={title}
                error={!!error}
                helperText={error}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                onBlur={() => {setError(null)}}
            />
            <Button
                onClick={addItem}>
                <AddBox/>
            </Button>
        </div>
    )
}

export default AddItemForm