import AppButton from "./ui/AppButton";

export default function TaskCard({task, onEdit, onToggle, onDelete}) {

    return (
        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                {/* TITLE + STATUS */}
                <div className="d-flex justify-content-between">

                    <h5>{task.title}</h5>

                    <span className={`badge ${
                    task.status === "Completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}>
                    {task.status}
                    </span>

                </div>

                {/* DESCRIPTION */}
                <p className="text-muted">
                    {task.description}
                </p>


                {/* ACTIONS */}
                <div className="d-flex gap-2">
                    <AppButton
                    label="Edit"
                    variant="warning"
                    className="btn-sm"
                    onClick={() => onEdit(task)}
                    />
                    <AppButton
                    label="Toggle"
                    variant="primary"
                    className="btn-sm"
                    onClick={() => onToggle(task)}
                    />
                    <AppButton
                    label="Delete"
                    variant="danger"
                    className="btn-sm"
                    onClick={() => onDelete(task._id)}
                    />
                </div>
            </div>
        </div>
    );
}