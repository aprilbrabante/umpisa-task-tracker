import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppInput from "../components/ui/AppInput";
import AppButton from "../components/ui/AppButton";

import api from "../api";

export default function AddTask() {

    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Pending"
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await api.post("/tasks/", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/tasks");

        } catch (err) {

            setError(err.response?.data?.error || "Something went wrong");
            console.log(err);
        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "500px" }}>

                <h3 className="text-center mb-3">
                    Add New Task
                </h3>

                <form onSubmit={handleSubmit}>
                    <AppInput
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />

                    <AppInput
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        required
                    />

                    <AppButton
                        label="Create Task"
                        type="submit"
                        variant="primary"
                        className="w-100"
                    />
                </form>

                {error && (
                    <p className="text-danger text-center mt-2">
                        {error}
                    </p>
                )}

            </div>
        </div>
    );
}