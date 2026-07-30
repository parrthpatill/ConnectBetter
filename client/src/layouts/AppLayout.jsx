import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationContext";
import "../styles/appLayout.css";

function AppLayout() {
    return (
        <NotificationProvider>

            <Navbar />

            <div className="app-layout">

                <Sidebar />

                <main className="main-content">
                    <Outlet />
                </main>

                <RightPanel />

            </div>

        </NotificationProvider>
    );
}

export default AppLayout;