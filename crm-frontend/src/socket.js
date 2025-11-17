import { io } from "socket.io-client";

// Get the API URL from your environment variables
const URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
