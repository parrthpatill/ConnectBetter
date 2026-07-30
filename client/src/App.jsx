import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import socket from "./services/socket";

function App() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            socket.connect();
            socket.emit("join", user.id);
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    return <AppRoutes />;
}

export default App;