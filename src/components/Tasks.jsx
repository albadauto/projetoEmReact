import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, handleTaskClick, handleDeleteClick }) => {
    return (
        <>
            {tasks.map(task => <Task task={task} handleTaskClick={handleTaskClick} handleDeleteClick={handleDeleteClick}/>)}

        </>
    )
};

export default Tasks;