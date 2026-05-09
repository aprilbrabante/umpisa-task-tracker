import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppButton from "../components/ui/AppButton";

import api from "../api";

export default function Profile() {

    const { token } = useContext(UserContext);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/details",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUserData(res.data.user);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);


    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                />
            </div>
        );
    }

        return (

        <div className="container py-5">
            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>

                <div className="card-body p-4">

                    <div className="text-center mb-4">

                        <div
                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
                            style={{
                            width: "80px",
                            height: "80px",
                            fontSize: "28px",
                            fontWeight: "bold"
                            }}
                        >
                            {userData?.firstName?.charAt(0)}
                        </div>

                        <h3 className="fw-bold">
                            {userData.firstName} {userData.lastName}
                        </h3>

                        <p className="text-muted mb-0">
                            User Profile
                        </p>

                    </div>


                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label text-muted">First Name</label>
                            <div className="form-control">{userData.firstName}</div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted">Last Name</label>
                            <div className="form-control">{userData.lastName}</div>
                        </div>

                        <div className="col-12">
                            <label className="form-label text-muted">Email</label>
                            <div className="form-control">{userData.email}</div>
                        </div>

                        <div className="col-12">
                            <label className="form-label text-muted">Mobile Number</label>
                            <div className="form-control">{userData.mobileNo}</div>
                        </div>

                    </div>

                </div>

                <div className="d-flex justify-content-center mb-4">
                    <AppButton
                        label="Change Password"
                        variant="primary"
                        onClick={() => navigate("/change-password")}
                    />
                </div>

            </div>

        </div>
    );
}