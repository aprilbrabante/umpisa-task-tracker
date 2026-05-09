import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddJobForm() {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (
            title !== "" &&
            company !== "" &&
            location !== "" && 
            status !== ""
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [title, company, location, status, notes])

    const addJob = async(e) => {

        e.preventDefault();

        try {

            setIsLoading(true);

            const res = await api.post("/api/jobs", {
                title: title,
                company: company,
                location: location,
                status: status,
                notes: notes
            });

            setTitle("");
            setCompany("");
            setLocation("");
            setStatus("");
            setNotes("");

            setIsLoading(false);

            navigate("/")
        } catch (error) {
            console.log("Failed to add job:", error);
        }

    }

    return (

        <form className="mb-3 d-flex flex-column gap-2" onSubmit={(e) => addJob(e)}>
            <label>
                <span>Job Title:</span>
                <input type="text" className="form-control" placeholder="Enter Job Title..." required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            </label>

            <label>
                <span>Company Name:</span>
                <input type="text" className="form-control" placeholder="Enter Company..." required 
                value={company}
                onChange={(e) => setCompany(e.target.value)} />
            </label>

            <label>
                <span>Location:</span>
                <input type="text" className="form-control" placeholder="Enter Location..." required 
                value={location}
                onChange={(e) => setLocation(e.target.value)}/>
            </label>

            <label htmlFor="">
                <span>Status:</span>
                <select className="form-select" required 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="" disabled hidden  >
                        Choose Status
                    </option>
                    <option value="application submitted">
                        Application Submitted
                    </option>
                    <option value="interview">
                        Interview
                    </option>
                    <option value="rejected">
                        Rejected
                    </option>
                    <option value="accepted">
                        Accepted
                    </option>
                </select>
            </label>

            <label htmlFor="">
                <span>Notes:</span>
                <textarea className="form-control" placeholder="Enter Notes" required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </label>

            <button className="btn btn-success" disabled={isLoading || !isFormValid}>{isLoading ? "Saving..." : "Save"}</button>
        </form>



    )
}