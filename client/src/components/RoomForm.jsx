import { useEffect, useRef, useState } from "react";
import { uid } from 'uid';
import { useNavigate } from "react-router-dom";
import axios from "axios"; // import axios for API calls
import propTypes from 'prop-types';
import { TiDeleteOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
export default function RoomForm({ setRoomForm }) {
  const [Join, setJoin] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(10); // default time
  const [totalQuestion, setTotalQuestion] = useState(5); // default difficulty
  const [difficulty, setDifficulty] = useState('easy'); // default difficulty
  const [roomID, setRoomId] = useState("");
  const inp = useRef("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigator("/auth");
    }
    scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleCreate = async () => {
    const val = uid(32); // generate unique roomID
    setRoomId(val);
    setLoading(true)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const owner = userInfo?.username; // get the owner name from localStorage
    const ownerID = userInfo?._id; // get the owner ID from localStorage
    console.log("owner",owner,ownerID)
    if (!owner || !ownerID) {
      toast.error('User information not found. Please login/logout.',{ style: { background : "#1e293b" , color : "white" },})
      return;
    }
    try {
      // Call API to create the room
      const response = await axios.post("http://localhost:5000/rooms/create", {
        owner,
        ownerID,
        roomID: val, // use the generated roomID
        difficulty,
        timePerQuestion,
        totalQuestion
      });
      if (response.status === 201) {
        sessionStorage.setItem("rmID",val)
        sessionStorage.setItem("room", "owner");
        toast.success('Room Created Successfully !',{ style: { background : "#1e293b" , color : "white" },})
        navigator(`/codebattle/${val}/1`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error('Something went wrong, Try again :) !',{ style: { background : "#1e293b" , color : "white" },})
    }
    setLoading(false)
  };

  const handleEnter = () => {
    if (roomID) {
      window.location.href = `/codebattle/${roomID}/1`;
    } else {
      inp.current.focus();
      inp.current.style.border = "1px solid red";
      setTimeout(() => {
        inp.current.style.border = "1px solid #685a96";
      }, 3000);
    }
  };

  return (
    <div className="flex w-screen absolute backdrop-blur-sm top-0 z-[10000] justify-center items-center h-screen">
      <Toaster/>
      {localStorage.getItem("userInfo") ? (
        <div className="bg-slate-800 border-2 border-violet-300 min-h-[28rem] h-[58vh] lg:h-[60vh] ssm:w-[90vw] w-[75vw] md:w-[33vw] lg:w-[30vw] xl:w-[25vw] shadow-2xl rounded-lg p-5">
          <div className="flex justify-between mb-8 items-center">
            <p className="text-white bg-slate-600 px-2 py-0.5 rounded-lg">ROOM</p>
            <TiDeleteOutline
              onClick={() => {
                setRoomForm(false);
              }}
              size={25}
              className="cursor-pointer hover:bg-violet-300 text-violet-300 rounded-full hover:text-black"
            />
          </div>

          <div className="flex justify-center max-w-[14rem] m-auto mb-3">
            <div className="relative flex w-full p-1 bg-[#334155] rounded-full">
              <span
                className="absolute inset-0 m-1 pointer-events-none"
                aria-hidden="true"
              >
                <span
                  className={`absolute inset-0 w-1/2 bg-[#5D2CA8] rounded-full shadow-sm shadow-[#5D2CA8] transform transition-transform duration-150 ease-in-out ${
                    Join ? "translate-x-0" : "translate-x-full"
                  }`}
                ></span>
              </span>
              <button
                className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                  Join ? "text-white/70" : " text-white"
                }`}
                onClick={() => setJoin(true)}
                aria-pressed={Join}
              >
                Join
              </button>
              <button
                className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                  Join ? "text-white/70" : " text-white"
                }`}
                onClick={() => setJoin(false)}
                aria-pressed={Join}
              >
                Create
              </button>
            </div>
          </div>

          {Join ? (
            <>
              <span className="flex flex-col justify-center h-2/3 gap-3">
                <input
                  ref={inp}
                  value={roomID}
                  onChange={(e) => setRoomId(e.target.value)}
                  id="RoomInp"
                  type="text"
                  name=""
                  className="hover:scale-105 hover:shadow-2xl focus:shadow-2xl focus:scale-105 placeholder:ml-1 transition-all ease-linear duration-75 p-2 bg-transparent outline-none border border-[#685a96] w-full rounded-md text-white "
                  placeholder="ENTER ROOM ID HERE"
                />

                <p
                  className="font-bold hover:scale-105 hover:shadow-2xl transition-all cursor-pointer ease-linear duration-75 bg-[#5D2CA8] text-center rounded-md p-2 text-white w-full"
                  onClick={handleEnter}
                >
                  JOIN
                </p>

                <p className="text-white w-[100%] text-center text-sm mt-5">
                  DONT HAVE ROOM ID?{" "}
                  <span
                    className="text-violet-300 font-bold hover:underline cursor-pointer hover:text-violet-200"
                    onClick={() => {
                      setJoin(false);
                    }}
                  >
                    CREATE
                  </span>{" "}
                  NOW.
                </p>
              </span>
            </>
          ) : (
            <>
              <div className="w-full mt-5 flex items-center justify-between p-1 gap-5">
              <div className="w-full text-center">
              <p className="text-white mb-1">Total Question</p>
                <span className="flex w-full justify-end">
                  <input
                    type="number"
                    name="time"
                    min={1}
                    max={15}
                    autoComplete="none"
                    value={totalQuestion}
                    onChange={(e) => setTotalQuestion(e.target.value)}
                    className="w-full text-lg hover:shadow-2xl focus:shadow-2xl  placeholder:ml-1 transition-all ease-linear duration-75 p-2 bg-transparent outline-none border border-[#685a96]  rounded-md text-white "
                    placeholder="TOTAL QUESTION"
                  />
                </span>
              </div>
               <div className="w-full text-center">
               <p className="text-white mb-1">Time / Question</p>
                <span className="flex w-full justify-end">
                  <input
                    type="number"
                    name="time"
                    min={1}
                    max={120}
                    autoComplete="none"
                    value={timePerQuestion}
                    onChange={(e) => setTimePerQuestion(e.target.value)}
                    className="w-[60%] text-lg hover:shadow-2xl focus:shadow-2xl  placeholder:ml-1 transition-all ease-linear duration-75 p-2 bg-transparent outline-none border border-[#685a96]  rounded-l-md text-white "
                    placeholder="TIME PER PROBLEM"
                  />
                  <p className="bg-[#5D2CA8] w-[50%] text-white text-center flex justify-center items-center rounded-r-md">
                    MIN
                  </p>
                </span>
               </div>
              </div>

              <p className="text-sm text-white/40 text-center mt-1">NOTE :  {totalQuestion} X {timePerQuestion} = {totalQuestion * timePerQuestion} min after Room ID will expire :) </p>

              <div className="w-full my-2 text-white">
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-slate-700 border border-slate-600 text-white outline-none rounded-lg block w-full p-2.5"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <span className="flex flex-col justify-center items-center gap-3">
                
                
              {loading ? 
                <div
                  role="status"
                  className="bg-[#b5a3fc] flex justify-center items-center cursor-not-allowed w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 hover:scale-[1.05]"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
               :
              <p
                  className="font-bold hover:scale-105 hover:shadow-2xl transition-all cursor-pointer ease-linear duration-75 bg-[#5D2CA8] text-center rounded-md p-2 text-white w-full"
                  onClick={handleCreate}
                >
                  CREATE
                </p>
               }

                <p className="text-white w-[100%] mt-5 text-center text-sm">
                  Already have room id?{" "}
                  <span
                    className="text-violet-300 font-bold hover:underline cursor-pointer hover:text-violet-200"
                    onClick={() => {
                      setJoin(true);
                    }}
                  >
                    JOIN
                  </span>{" "}
                  NOW.
                </p>
                <p className="text-sm text-white/40">The link will expire if you abandon the room.</p>
                </span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

RoomForm.propTypes = {
  setRoomForm: propTypes.func,
};
