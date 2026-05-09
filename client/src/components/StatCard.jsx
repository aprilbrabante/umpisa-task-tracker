export default function StatCard({ title, value, color }) {

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h6 className="text-muted">
                    {title}
                </h6>
                <h3 className={`fw-bold ${color}`}>
                    {value}
                </h3>
            </div>
        </div>
    );
}