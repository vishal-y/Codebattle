import Programmers from "../Programmers"
import Chat from "../Chat"

export default function PhoneRoomScreen() {
  return (
    <div className="max-h-[100vh] min-h-[90vh] h-[92vh] w-[100vw] flex  flex-col items-center text-white">
        
         <div className="max-h-[30vh] h-[25vh] pb-3">
         <Programmers
              clients={clients}
              roomId={roomId}
              admin={admin}
              socketRef={socketRef}
              clientUsername={clientUsername}
            />

<div className="cursor-pointer flex-col mt-2 mb-2 rounded-md text-black bg-[#c4b5fd] w-full p-1 lg:p-3 flex justify-around">
               
                 <p className="text-sm ml-1">Send this room Id to your friends</p>
               <span className="bg-slate-600 p-1 px-3 text-white/80 rounded-md">
                 {roomId}
               </span>
             </div>
         </div>

          <div className="max-h-[70vh] min-h-[60vh] h-[65vh] ">
          <Chat
        message={message}
        setMessage={setMessage}
        roomId={roomId}
        socketRef={socketRef}
        clientUsername={clientUsername}
        chats={chats} 
    />
          </div>

          </div>
  )
}
