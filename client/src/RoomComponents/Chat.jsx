import PropTypes from "prop-types";

export default function Chat({
  message,
  setMessage,
  roomId,
  socketRef,
  clientUsername,
}) {
  const handleMessageValue = (e) => {
    setMessage(e.target.value);
  };

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12 || 12;
  
    // Add leading zero to minutes if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const currentTime = `${hours}:${formattedMinutes} ${ampm}`;
    return currentTime;
  }
  
  // Example usage

  

  const handleMessage = (e) => {
    if (e.key == "Enter" && message) {
      console.log("message check");
      const currentTime = getCurrentTime();
      socketRef.current.emit("message", {
        message,
        roomId,
        username: clientUsername,
        time : currentTime
      });
     
      setMessage("");
    } else {
      document.getElementById("message").style.border = "2px solid #685a96";
      document.getElementById("message").placeholder = "TYPE SOMETHING HERE";
      setTimeout(() => {
        document.getElementById("message").style.border = "1px solid #685a96";
        document.getElementById("message").placeholder = "Type a message here";
      }, 2000);
    }
  };

  return (
    <div className="p-1 flex flex-col justify-between h-[70%]">
      <div id="chat" className="overflow-y-scroll">
        <p className="text-center ">chat</p>
      </div>

      <span className="flex justify-center items-center align-baseline">
        <input
          type="text"
          value={message}
          onKeyDown={handleMessage}
          onChange={handleMessageValue}
          name="message"
          id="message"
          className="bg-transparent border border-[#685a96] p-2 w-full rounded-xl text-white outline-none "
          placeholder="Type a message here"
        />
        {/* <button className="p-2 bg-violet-300 text-black rounded-r-xl" onClick={handleMessage}>SEND</button> */}
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
};
