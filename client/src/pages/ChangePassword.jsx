import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppInput from "../components/ui/AppInput";
import AppButton from "../components/ui/AppButton";

import api from "../api";

export default function ChangePassword() {

    const { token, clearToken } = useContext(UserContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({newPassword: ""});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const res = await api.patch("/users/update-password", form,
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Password updated successfully.");

            setTimeout(() => {
                clearToken();
                navigate("/login");
            }, 1500);

            setForm({
                newPassword: ""
            });

        } catch (err) {
            setError(err.response?.data?.error || "Failed to update password");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="container py-5">

            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "500px" }}>

                <div className="card-body p-4">
                    <h3 className="fw-bold mb-3">
                        Change Password
                    </h3>

                    <form onSubmit={submit}>
                        <AppInput
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />
                        <AppButton
                            label={
                            loading
                                ? "Updating..."
                                : "Update Password"
                            }
                            variant="primary"
                            className="w-100"
                            type="submit"
                            disabled={loading}
                        />
                    </form>

                    {message && (
                    <p className="text-success mt-3 text-center">
                        {message}
                    </p>
                    )}

                    {error && (
                    <p className="text-danger mt-3 text-center">
                        {error}
                    </p>
                    )}

                </div>
            </div>
        </div>
    );
    }