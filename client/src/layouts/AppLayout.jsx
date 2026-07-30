import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import { Outlet } from "react-router-dom";

import "../styles/appLayout.css";

function AppLayout({ children }) {
    return (
        <>
            <Navbar />

            <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                    <Outlet />
                </main>

                <RightPanel />
            </div>
        </>
    );
}

export default AppLayout;