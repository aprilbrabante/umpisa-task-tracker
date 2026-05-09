import AppNavbar from "../AppNavbar";

export default function AppLayout({ children }) {

    return (
        <div>
            <AppNavbar />
            <div className="container py-4">
                {children}
            </div>
        </div>
    );
}