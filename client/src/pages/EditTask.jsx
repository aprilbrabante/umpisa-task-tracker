import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppInput from "../components/ui/AppInput";
import AppButton from "../components/ui/AppButton";

import api from "../api";

export default function EditTask() {

    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Pending"
    });

    const [error, setError] = useState("");

    // LOAD TASK DATA
    const fetchTask = async () => {

        try {

            const res = await api.get(`/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setForm(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // UPDATE TASK
    const handleUpdate = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await api.patch(`/tasks/${id}`, form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/tasks");

        } catch (err) {
            setError(err.response?.data?.error || "Update failed");
            console.log(err);
        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "500px" }}>

                <h3 className="text-center mb-3">
                    Edit Task
                </h3>

                <form onSubmit={handleUpdate}>

                    <AppInput
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <AppInput
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <div className="mb-3">

                        <label className="form-label">
                            Status
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Completed">
                             Completed
                            </option>
                        </select>
                    </div>

                    <AppButton
                        label="Update Task"
                        variant="success"
                        className="w-100"
                        type="submit"
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