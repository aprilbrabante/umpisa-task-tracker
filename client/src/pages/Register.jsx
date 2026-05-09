import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppInput from "../components/ui/AppInput";
import AppButton from "../components/ui/AppButton";

import api from "../api";

export default function Register() {

    const navigate = useNavigate();

    const user = useContext(UserContext);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const res = await api.post("/users/register", form);

            // OPTIONAL: auto login after register
            user.setNewToken(res.data.token);

            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "500px" }}>

                <h3 className="text-center mb-3">
                    Create Account
                </h3>

                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-md-6">
                            <AppInput
                                label="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <AppInput
                                label="Last Name"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <AppInput
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <AppInput
                        label="Mobile Number"
                        name="mobileNo"
                        value={form.mobileNo}
                        onChange={handleChange}
                        required
                    />

                    <AppInput
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <AppButton
                        label={loading ? "Creating..." : "Register"}
                        variant="success"
                        className="w-100"
                        type="submit"
                        disabled={loading}
                    />

                </form>

                {error && (
                    <p className="text-danger text-center mt-2">
                        {error}
                    </p>
                )}

                <div className="text-center mt-3">

                    <small>
                        Already have an account?{" "}
                        <span
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </small>
                </div>
            </div>
        </div>
    );
}