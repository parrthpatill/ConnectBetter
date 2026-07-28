import { BrowserRouter, Routes, Route } from "react-router-dom";

import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    }
                />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;