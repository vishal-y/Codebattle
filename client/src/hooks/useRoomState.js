import { useState } from "react";

export const useRoomState = () => {
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [isRoom, setIsRoom] = useState(false);
  const [ready, setReady] = useState(false);

  return {
    roomId,
    setRoomId,
    roomData,
    setRoomData,
    isRoom,
    setIsRoom,
    ready,
    setReady,
  };
};
