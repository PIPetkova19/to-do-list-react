import React, { useState, useEffect } from 'react'

function ToDoList() {
    //зарежда от Local Storage 
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTasks] = useState("");
    const [error, setError] = useState("");

    //записва в Local Storage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask() {
        if (newTask === "") {
            setError("*Enter a task");
            return;
        }

        setTasks(pTask => [...pTask, newTask]);
        setNewTasks("");
        setError("");
    }

    function deleteTask(index) {
        setTasks(pTask => pTask.filter((_, i) => i !== index));
    }

    function moveUp(index) {
        if (index > 0) {
            const updated = [...tasks];
            [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
            setTasks(updated);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updated = [...tasks];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
            setTasks(updated);
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="w-50 p-10">
                <h1 id="header-text" className='text-center'>To Do List</h1>
                <h2 id="h2-text" className='text-center mb-4'>What's your plan for today?</h2>

                <div className="input-group mb-3">
                    <input className="form-control" type="text" value={newTask} onChange={(e) => setNewTasks(e.target.value)} placeholder="Add new task" />
                    <button id="add-btn" onClick={addTask}>+</button>
                </div>

                <ul className="list-group">
                    {tasks.map((task, index) => (
                        <li key={index} id="unordered-list" className="list-group-item d-flex justify-content-between align-items-center">
                            {task}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                <button id="delete-btn" onClick={() => deleteTask(index)}>x</button>
                                <button id="moveUp-btn" onClick={() => moveUp(index)}>↑</button>
                                <button id="moveDown-btn" onClick={() => moveDown(index)}>↓</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <p id="error-msg" className="mt-3">{error}</p>
            </div>
        </div>
    )
}

export default ToDoList