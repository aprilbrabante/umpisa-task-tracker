import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import StatCard from "../components/StatCard";
import AppButton from "../components/ui/AppButton";

import api from '../api';

export default function Dashboard() {

    const { token } = useContext(UserContext);
    const user = useContext(UserContext);

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks", {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });

            setTasks(Array.isArray(res.data) ? res.data : []);

        } catch (err) {
            console.log(err);
            setTasks([]);
        }
    };

    useEffect(() => {

        if(!user.token) {
            navigate('/login')
        } else {
            fetchTasks();
        }

    }, [])


    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const total = safeTasks.length;
    const completed = safeTasks.filter(t => t.status === "Completed").length;
    const pending = safeTasks.filter(t => t.status === "Pending").length;

    return (


        <div className="container py-5">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Dashboard</h2>
                    <p className="text-muted mb-0">
                    Task overview
                    </p>
                </div>
            </div>

            {/* STATS */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <StatCard
                    title="Total Tasks"
                    value={total}
                    color="text-primary"
                    />
                </div>

                <div className="col-md-4">
                    <StatCard
                    title="Completed Tasks"
                    value={completed}
                    color="text-success"
                    />
                </div>

                <div className="col-md-4">
                    <StatCard
                    title="Pending Tasks"
                    value={pending}
                    color="text-warning"
                    />
                </div>
            </div>


            {/* QUICK ACTIONS */}
            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <h5 className="mb-3 fw-bold">
                        Quick Actions
                    </h5>

                    <p className="text-muted">
                        Manage your tasks efficiently.
                    </p>

                    <div className="d-flex flex-wrap gap-2">

                        <AppButton
                            label="+ Create Task"
                            variant="primary"
                            onClick={() => navigate("/tasks/create")}
                        />

                        <AppButton
                            label="View All Tasks"
                            variant="outline-primary"
                            onClick={() => navigate("/tasks")}
                        />

                        <AppButton
                            label="My Profile"
                            variant="outline-secondary"
                            onClick={() => navigate("/profile")}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}