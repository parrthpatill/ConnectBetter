import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import Analytics from "../pages/Analytics";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Groups from "../pages/Groups";
import Friends from "../pages/Friends";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/feed"
                        element={<Feed />}
                    />

                    <Route
                        path="/friends"
                        element={<Friends />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/messages"
                        element={<Messages />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/groups"
                        element={<Groups />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;