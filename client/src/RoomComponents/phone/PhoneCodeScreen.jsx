import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MainEditor from "../../components/MainEditor";
import ShareEditor from '../../components/ShareEditor';
import { TiDeleteOutline } from "react-icons/ti";
import { FaPlay } from "react-icons/fa6";

export default function PhoneCodeScreen({
  language,
  setLanguage,
  ready,
  setReady,
  show,
  setShow,
  sharedCode,
  output,
  outputLoading,
  RunCode,
  socketRef,
  roomId,
  clientUsername,
  questionData,
  handleVallanguage
}) {
  return (
    <PanelGroup style={{ height: "94vh" }} direction="vertical">
      <Panel className="h-[90vh]" defaultSize={70} minSize={50}>
        <div className="w-full h-[10%] flex justify-between items-center px-3">
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border text-purple-500 p-1 hover:bg-transparent text-sm rounded-lg"
          >
            <option value="cpp">CPP</option>
            <option value="c">C</option>
            <option value="java">JAVA</option>
            <option value="python">PYTHON</option>
            <option value="javascript">JAVASCRIPT</option>
            <option value="csharp">C#</option>
            <option value="rust">RUST</option>
            <option value="go">GO</option>
          </select>

          <div className={`${isRoom ? "block" : "hidden"} `}>
            {!ready ? (
              <button
                onClick={handleReady}
                id="readyButton"
                className="bg-[#b5a3fc] px-2 py-1 rounded-md text-black text-base w-fit cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05]"
              >
                Click here to start
              </button>
            ) : (
              <div className="text-sm bg-[#c4b5fd] text-black text-center p-1 rounded-md shadow-2xl px-3 flex gap-1">
                Round ends in <p id="timeleft"></p>{" "}
              </div>
            )}
          </div>
        </div>

        <div className="h-[77vh]">
          {show ? (
            <div className="h-full">
              <div className="bg-violet-300 text-black font-medium capitalize px-1 py-1 rounded-md mb-2 flex justify-between items-center">
                <span id="whoscode">You are currently looking at code</span>
                <TiDeleteOutline
                  size={23}
                  onClick={() => setShow(false)}
                />
              </div>
              <ShareEditor code={sharedCode} />
            </div>
          ) : (
            <div className="h-full p-2">
              <MainEditor
                socketRef={socketRef}
                roomId={roomId}
                user={clientUsername}
                val={language === "cpp" ? handleVallanguage(questionData.templatecpp) : handleVallanguage(questionData.templatejava)}
                isReady={ready}
              />
            </div>
          )}
        </div>
      </Panel>
      <PanelResizeHandle />

      <Panel className="h-[10vh] text-white" defaultSize={30} minSize={15}>
        <div className="flex flex-col px-5 mt-1">
          <p className="text-slate-500">you can resize the tabs :)</p>
          <div className="flex justify-between w-full items-center">
            <p>OUTPUT : </p>
            {outputLoading ? (
              <div role="status" className="cursor-not-allowed">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <FaPlay
                size={25}
                onClick={RunCode}
                className="hover:text-violet-300"
              />
            )}
          </div>

          <div className="flex mt-3 justify-start w-full">
            {output}
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}
