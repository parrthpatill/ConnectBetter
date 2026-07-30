import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import socket from "./services/socket";

function App() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            return;
        }

        socket.connect();

        const handleConnect = () => {
            socket.emit("join", user.id);
        };

        socket.once("connect", handleConnect);

        if (socket.connected) {
            handleConnect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.disconnect();
        };
    }, []);

    return <AppRoutes />;
}

export default App;