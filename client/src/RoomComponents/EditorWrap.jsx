import MainEditor from "../components/MainEditor";
import ShareEditor from "../components/ShareEditor";
import { TiDeleteOutline } from "react-icons/ti";
import PropTypes from 'prop-types';

export default function EditorWrap({show , setshow , sharedCode , language , solutioncpp , solutionjava , mainCode , setMainCode , roomId , socketRef , clientUsername}) {

    const handleVallanguage = (lang) => {
        setMainCode(lang);
        return mainCode;
      };
    

    return (
    <div className="h-[90%]">
             { show ? (
                <div className="h-full">
                  <div className="bg-violet-300 text-black font-medium capitalize px-1 py-1 rounded-md mb-2 flex justify-between items-center">
                    <span id="whoscode">You are currenty looking at code</span>
                    <TiDeleteOutline
                      size={23}
                      onClick={() => {
                        setshow(false);
                      }}
                      />{" "}
                  </div>
                  <ShareEditor code={sharedCode} />
                </div>
              ) : (
                <div className="h-full">
                  <MainEditor
                  socketRef={socketRef}
                  roomId={roomId}
                  user={clientUsername}
                  val={
                    language == "cpp"
                      ? handleVallanguage(solutioncpp)
                      : handleVallanguage(solutionjava)
                  }
                />
                </div>
              )}
             </div>
  )
}

EditorWrap.propTypes = {
    show: PropTypes.bool.isRequired,
    setshow : PropTypes.func.isRequired,
    sharedCode : PropTypes.string.isRequired,
    language : PropTypes.string.isRequired,
    solutioncpp : PropTypes.string.isRequired,
    solutionjava : PropTypes.string.isRequired,
    mainCode : PropTypes.string.isRequired,
    setMainCode : PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    socketRef: PropTypes.object.isRequired,
    clientUsername : PropTypes.string.isRequired,
};
  