import { Panel, PanelResizeHandle } from "react-resizable-panels";
import Programmers from "../Programmers";
import Chat from "../Chat";

export default function Right({
  clients,
  roomId,
  admin,
  socketRef,
  clientUsername,
  message,
  setMessage,
  chats,
  isCopied,
}) {
  return (
    <>
      <Panel
        defaultSize={23}
        minSize={23}
        maxSize={30}
        className="h-[98.9vh] min-h-[40rem] mr-2 mt-1 border border-[#1f1f1f] text-white rounded-2xl bg-[#100821]"
      >
        <div className="h-full">
          <Programmers
            clients={clients}
            roomId={roomId}
            admin={admin}
            socketRef={socketRef}
            clientUsername={clientUsername}
          />
          <div className="cursor-pointer rounded-full text-center text-black bg-[#c4b5fd] p-1 lg:p-3 flex justify-around items-center" >
            <span>
              {Array.from(roomId).map((letter, index) => {
                return index < 15 ? letter : index > 18 ? null : ".";
              })}
            </span>{" "}
            {isCopied ? (
              <div className='flex justify-center items-center gap-2 bg-green-200 text-green-600 px-4 py-1 rounded-2xl hover:scale-110 transition-all ease-linear duration-75 cursor-not-allowed'>
                Id copied
              </div>
            ) : (
              <div className='flex justify-center items-center gap-2 bg-slate-700 text-white px-4 py-1 rounded-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-75'>
                copy id
              </div>
            )}
          </div>
          <Chat
            message={message}
            setMessage={setMessage}
            roomId={roomId}
            socketRef={socketRef}
            clientUsername={clientUsername}
            chats={chats}
          />
        </div>
      </Panel>
      <PanelResizeHandle />
    </>
  );
}
