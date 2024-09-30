import { useEffect, useRef } from "react";
import { initSocket } from "../socket";

export const useSocket = (roomId, onReady) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      const socket = initSocket();
      socketRef.current = socket;

      socket.emit("join_room", roomId);

      socket.on("ready", () => {
        onReady();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [roomId, onReady]);

  return socketRef;
};
