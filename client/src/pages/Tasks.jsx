import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppButton from "../components/ui/AppButton";
import TaskCard from "../components/TaskCard";

import api from "../api";

export default function Tasks() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    // FETCH TASKS
    const fetchTasks = async () => {

        try {
            const res = await api.get(
            "tasks",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setTasks(Array.isArray(res.data) ? res.data : []);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    // DELETE TASK
    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (err) {
            console.log(err);
        }
    };

    // TOGGLE STATUS
    const toggleStatus = async (task) => {

        try {

            const updatedStatus =
                task.status === "Pending"
                    ? "Completed"
                    : "Pending";

            await api.patch(`/tasks/${task._id}`,
                {
                    title: task.title,
                    description: task.description,
                    status: updatedStatus
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="container py-5">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">Tasks</h2>

                <AppButton
                    label="+ Add Task"
                    variant="primary"
                    onClick={() => navigate("/tasks/create")}
                />
            </div>

            {/* TASK LIST */}
            <div className="row g-3">

                {tasks.length === 0 && (
                    <p className="text-muted text-center">
                    No tasks yet.
                    </p>
                )}

                {tasks.map(task => (

                <div className="col-12 col-md-6 col-lg-4" key={task._id}>
                    <TaskCard
                        task={task}
                        onEdit={(task) => navigate(`/tasks/edit/${task._id}`)}
                        onToggle={toggleStatus}
                        onDelete={deleteTask}
                    />

                </div>

                ))}

            </div>
        </div>
    );
}