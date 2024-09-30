import PropTypes from "prop-types";

export default function Chat({
    message,
    setMessage,
    roomId,
    socketRef,
    clientUsername,
    chats 
}) {
    const handleMessageValue = (e) => {
        setMessage(e.target.value);
    };

    const getCurrentTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes} ${ampm}`;
    };

    const handleMessage = (e) => {
        if (e.key === "Enter" && message) {
            const currentTime = getCurrentTime();
            socketRef.current.emit("message", {
                message,
                roomId,
                username: clientUsername,
                time: currentTime,
            });
            setMessage("");
        } else {
            // Handle invalid message input
            const messageInput = document.getElementById("message");
            messageInput.style.border = "2px solid #685a96";
            messageInput.placeholder = "TYPE SOMETHING HERE";
            setTimeout(() => {
                messageInput.style.border = "1px solid #685a96";
                messageInput.placeholder = "Type a message here";
            }, 2000);
        }
    };

    return (
        <div className="p-1 rounded-xl boder-t-2 border-violet-600 lg:rounded-none flex flex-col justify-between h-[90%] w-[96vw] lg:w-auto lg:h-[70%]">
           <div id="chat" className="overflow-y-scroll">
    <p className="text-center">Chat</p>
    {Array.isArray(chats) && chats.map((chat, index) => {
    const side = chat.username === clientUsername ? "justify-end" : "justify-start";
    return (
        <div key={index} className={`h-fit p-2 flex ${side}`}>
            <div className="bg-slate-800 w-fit max-w-[90%] px-3 p-1 rounded-2xl flex flex-col gap-2">
                <div className="text-xs capitalize flex justify-between gap-2 items-center text-violet-500">
                    <p>{chat.username}</p>
                    <p>{chat.time}</p>
                </div>
                <p className="break-words overflow-hidden">{chat.message}</p>
            </div>
        </div>
    );
})}

</div>

            <span className="flex justify-center items-center align-baseline">
                <input
                    type="text"
                    value={message}
                    onKeyDown={handleMessage}
                    onChange={handleMessageValue}
                    name="message"
                    autoComplete="off"
                    id="message"
                    className="bg-transparent border border-[#685a96] p-2 w-full rounded-xl text-white outline-none"
                    placeholder="Type a message here"
                />
            </span>
        </div>
    );
}

Chat.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    socketRef: PropTypes.object.isRequired,
    clientUsername: PropTypes.string.isRequired,
    chats: PropTypes.arrayOf(
      PropTypes.shape({
          username: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
      })
  ).isRequired,
};
