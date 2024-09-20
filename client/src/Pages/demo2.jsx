import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemSet from "../utils/ProblemSet";
import { FaArrowLeftLong, FaPlay } from "react-icons/fa6";
import toast from "react-hot-toast";
import MainEditor from "../components/MainEditor";
import ShareEditor from "../components/ShareEditor";
import Chip from "../components/Chip";
import { useNavigate } from "react-router-dom";
import { DiCodeigniter } from "react-icons/di";
import { initSocket } from "../socket";
import { FaRegCopy } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { useAtom } from "jotai";
import { allMainCode } from "../App";

export default function Editor() {
  const [mainCode, setMainCode] = useAtom(allMainCode);

  const navigator = useNavigate();
  const [admin , setAdmin] = useState("")
  const [ready, setReady] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [questionDiff, setQuestionDiff] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [solutioncpp, setsolutioncpp] = useState("");
  const [solutionjava, setsolutionjava] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [questionInfo , setQuestionInfo] = useState({
    tags : "",
    expectedValue : "",
    timeComplexity : "",
    spaceComplexity : "",
  })
  const [clients, setClients] = useState([
    // { 'socketId' : 0 , 'username' : 'Abhishek' },
    // { 'socketId' : 1 , 'username' : 'Omkar' },
  ]);

  const [show, setshow] = useState(false);
  const [sharedCode, setSharedCode] = useState("");

  if (!localStorage.getItem("token") && !localStorage.getItem("userInfo")) {
    navigator("/auth");
  }

  const clientUsername = localStorage.getItem("username");
  // websocket connection
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (e) => console.log(e));
      socketRef.current.on("connect_failed", (e) => console.log(e));

      if (localStorage.getItem("username")) {
        socketRef.current.emit("join", {
          roomId,
          username: clientUsername,
        });
      }

      socketRef.current.on("joined", ({ admin , clients, username, socketId }) => {
        console.log("admin : " , admin , socketId);
        const a = ()=>{
          setAdmin(admin);
        }
        a();
        console.log("set admin is : ", admin)
        setClients(clients);
        let popup = `<div class="flex justify-between items-center bg-transparent border border-green-500 text-green-500 rounded-xl my-2 py-1">
        <p class="ml-4"><span  class="font-bold capitalize">${username} </span> has joined the room </p>
        <p class="text-xm mr-4">${time()}</p>
      </div>`;
        document.getElementById("chat").innerHTML += popup;
      });

      setInterval(() => {
        socketRef.current.on("codechange", ({ e }) => {
          language == "cpp" ? setMainCode(e) : setMainCode(e);
        });
      }, 1000);

      socketRef.current.on("all-message", ({ username, message }) => {
        console.log(username, message);
        let side =
          username == localStorage.getItem("username")
            ? "justify-end"
            : "justify-start";
        let popup = `<div class="h-fit p-2 flex ${side} ">
        <p class="bg-slate-800 w-fit px-3 p-1 rounded-md">
         ${message}
        </p>
      </div>`;
        let chatEle = document.getElementById("chat");
        chatEle.innerHTML += popup;
      });

      socketRef.current.on("send-code", ({ code }) => {
        console.log("response from server : ", code);
        setSharedCode(code);
        setshow(true);
      });

      socketRef.current.on('player-start',({name})=>{
    let popup = `<div class="flex justify-between items-center bg-transparent border border-violet-400 text-violet-400 rounded-xl my-2 py-1">
    <p class="ml-4"><span class="font-bold capitalize">${name} </span> is ready for battle ⚔️. </p>
    <p class="text-xm mr-4">${time()}</p>
  </div>`;
document.getElementById("chat").innerHTML += popup;
      })

      socketRef.current.on("player-start", ({ start }) => {
        if (start) {
    let popup = `<div class="flex justify-between items-center bg-transparent border border-cyan-400 text-cyan-400 rounded-xl my-2 py-1">
    <p class="ml-4 text-center">Good luck. Battle has been started. 🧑‍💻</p>
    <p class="text-xm mr-4">${time()}</p>
  </div>`;
document.getElementById("chat").innerHTML += popup;
          setReady(true);
          const timerId = countdown(2);
          return () => clearInterval(timerId);
        }
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        let popup = `<div class="flex justify-between items-center bg-transparent border border-red-500 text-red-500 rounded-xl my-2 py-1">
        <p class="ml-4"><span class="font-bold capitalize">${username} </span> has left the room </p>
        <p class="text-xm mr-4">${time()}</p>
      </div>`;
        document.getElementById("chat").innerHTML += popup;
        setClients((prev) => {
          return prev.filter((clients) => clients.socketId != socketId);
        });
      });
    };
    init();
  }, []);

  let a = window.location.href.split("/");
  let num = parseInt(a[a.length - 1].split("%20").join(" "));
  if (num > 10) {
    num = 1;
  }

  useEffect(() => {
    setRoomId(a[a.length - 2].split("%20").join(" "));

    setClients([...clients, { socketId: 3, username: "Vishal" }]);

    if (a.length > 4) {
      document.getElementById("navbar").style.display = "none";
    }
    setQuestion(ProblemSet[num - 1].problem);
    setQuestionDiff(ProblemSet[num - 1].difficulty);
    setQuestionDesc(ProblemSet[num - 1].description);
    setsolutioncpp(ProblemSet[num - 1].solution.cpp);
    setsolutionjava(ProblemSet[num - 1].solution.java);
    // setQuestionConstraints(ProblemSet[num - 1].constraints)
    console.log(ProblemSet[num - 1].constraints)

    Object.entries(ProblemSet[num - 1].constraints).forEach(([ _ ,j]) => {
      console.log(_, j);
      const li = document.createElement("li");
      li.textContent = j;
      document.getElementById("constraints").appendChild(li);
      });

    setQuestionInfo({
      tags : ProblemSet[num - 1].tags,
      expectedValue : ProblemSet[num - 1].expectedValue,
      timeComplexity : ProblemSet[num - 1].timeComplexity,
      spaceComplexity : ProblemSet[num - 1].spaceComplexity
    })
  }, []);

  const tabs = ["Description", "Solution", "Submission"];
  const [selected, setSelected] = useState(tabs[0]);

  const handleBack = () => {
    toast(
      (t) => (
        <span className="">
          Are you sure ?
          <button
            className="bg-[#b5a3fc] p-2 ml-2 text-black rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              window.history.back();
            }}
          >
            Go back
          </button>
        </span>
      ),
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  const time = () => {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let formattedTime =
      hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
    return formattedTime;
  };

  function countdown(time) {
    var countTimeLeft = time * 60;

    var timer = setInterval(function () {
      var minutes = Math.floor(countTimeLeft / 60);
      var seconds = countTimeLeft % 60;

      document.getElementById("timeleft").innerText = `${minutes}m ${seconds}s`;

      if (countTimeLeft <= 0) {
        let roomId = window.location.href.split("/");
        clearInterval(timer);
        if (localStorage.getItem("Round")) {
          localStorage.setItem(
            "Round",
            parseInt(localStorage.getItem("Round")) + 1
          );
        } else {
          localStorage.setItem("Round", 1);
        }
        navigator(`/codebattle/${roomId[roomId.length - 2]}/${num + 1}`);
        window.location.reload();
      }

      countTimeLeft--;
    }, 1000);

    return timer;
  }

  const handleReady = () => {
    let name = localStorage.getItem("username");
    socketRef.current.emit("player-ready",{name});
    document.getElementById("readyButton").innerHTML="Waiting for others..."
  };

  const handleMessage = (e) => {
    if (e.key == "Enter") {
      socketRef.current.emit("message", {
        message,
        roomId,
        username: clientUsername,
      });
      console.log("enter kiya bhai");
      setMessage("");
    }
  };

  const handleScreenShare = (e) => {
    let whoscode = e.currentTarget.textContent;
    if (localStorage.getItem("username") != whoscode) {
      console.log("whoscode", whoscode);
      socketRef.current.emit("share-code", { whoscode, clientUsername });
      setshow();
      console.log("request sent for code ");
    } else {
      console.log("you can already see you code ");
    }
    // alert(`Do you want to view ${u_name}'s code ? `); // Display an alert message
  };

  const handleVallanguage = (lang) => {
    setMainCode(lang);
    console.log("set language code : ", mainCode);
    return mainCode;
  };

  return (
    <div className="bg-slate-800 overflow-hidden">
      <PanelGroup direction="horizontal">
        <div className="hidden h-full w-screen absolute justify-center items-center z-40 bg-black/[55%] ">
          <div className="h-[25vh] w-[35vw] rounded-3xl bg-slate-900"></div>
        </div>

        <Panel
          defaultSize={30}
          minSize={30}
          maxSize={35}
          className="h-[98.9vh] min-h-[40rem] w-full  flex justify-between items-center flex-col border border-[#1f1f1f] text-white rounded-2xl bg-[#100821] ml-2 m-1 mr-0"
        >
          <div className="p-8 h-full min-h-[100%] ">
            <div className="py-4 flex justify-start gap-6 items-center">
              <div
                onClick={handleBack}
                className="h-8 w-8 cursor-pointer flex justify-center shadow-2xl items-center bg-violet-300 p-2 rounded-full"
              >
                <FaArrowLeftLong style={{ color: "black" }} size={15}>
                  BACK
                </FaArrowLeftLong>
              </div>

              <ul className="flex gap-4">
                {tabs.map((tab) => (
                  <Chip
                    text={tab}
                    selected={selected === tab}
                    setSelected={setSelected}
                    key={tab}
                  />
                ))}
              </ul>
            </div>

            <div id="desc" className="h-full  max-h-[90%] overflow-hidden">
              <span className="text-white text-xl mt-2 flex justify-start items-center gap-2 mb-4">
                {num}. {question}
                <span
                  className={
                    questionDiff !== "Hard"
                      ? questionDiff === "Easy"
                        ? " text-green-500 text-sm p-1 bg-slate-800 rounded-md"
                        : "text-yellow-500 text-sm p-1 bg-slate-800 rounded-md"
                      : "text-red-500 text-sm p-1 bg-slate-800 rounded-md"
                  }
                >
                  {questionDiff}
                </span>
              </span>
              <p className="mt-5">{questionDesc}</p>
              <div className="mt-6">Expected Value : <div className=" bg-slate-800 rounded-xl my-1 mt-2 p-2">{questionInfo.expectedValue}</div></div>

              <div className="mt-3 mb-1 flex items-center justify-start">Expected Time complexity : <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">{questionInfo.timeComplexity}</div></div>

              <div className="mt-1 mb-3 flex items-center justify-start">Expected Expected Space complexity :  <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">{questionInfo.spaceComplexity}</div></div>
              {/* <p className="p-2 bg-slate-800 rounded-xl my-2" >constraints : {questonConstraints}</p> */}
              <p >constraints : </p>
              <p id="constraints" className="p-2 bg-slate-800 rounded-xl my-2" ></p>
            </div>


            <div className="hidden" id="sol">
              {<p>sol</p>}
            </div>

            <div className="hidden" id="sub">
              submission
            </div>
          </div>

        </Panel>
        <PanelResizeHandle />

        <Panel className="mr-1">
          <PanelGroup direction="vertical">
            <Panel className="border border-[#1f1f1f] p-4 text-white rounded-2xl bg-[#100821] m-1 mr-0">
              <div className="w-full pb-2 flex justify-between items-center px-1">
                <select
                  id="language"
                  onClick={(e) => {
                    setLanguage(e.target.value);
                  }}
                  className="bg-transparent border text-purple-500 p-1 hover:bg-transparent text-sm rounded-lg"
                >
                  <option value="cpp">CPP</option>
                  <option value="java">JAVA</option>
                </select>

                <div>
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

                <span className="flex gap-2">
                  <FaPlay size={25} className="hover:text-violet-300" />
                  <DiCodeigniter size={25} className="hover:text-amber-500" />
                </span>
              </div>

              {show ? (
                <div>
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
              )}
            </Panel>
            <PanelResizeHandle />

            <Panel defaultSize={10} maxSize={35} minSize={10}>
              <PanelGroup direction="horizontal">
                <Panel className="border border-[#1f1f1f] p-4 text-white rounded-2xl bg-[#100821] m-1 mt-0 mr-0">
                  bottom
                </Panel>
                <PanelResizeHandle />
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />

        <Panel
          defaultSize={25}
          minSize={20}
          maxSize={30}
          className="h-[98.9vh] mr-2 mt-1 border border-[#1f1f1f] text-white rounded-2xl bg-[#100821] "
        >
          <div className="h-full">

            <div className="p-4 h-[30%]">
              <p>Programmers :</p>
              <span className="grid md:grid-cols-3 lg:grid-cols-4 my-4">
                {clients.map((data, id) => {
                  return (
                    <div
                      key={id}
                      className="flex flex-col justify-center items-center "
                      onClick={handleScreenShare}
                    >
                      {data.username==admin ? (
                        <p title={data.username + " is the admin"} className="bg-violet-300 cursor-pointer text-black text-center h-10 w-fit px-2 flex justify-center items-center shadow-2xl rounded-md capitalize -300 flex-col ">
                          Admin
                        </p>
                      ) : (
                        <p title="you" className="bg-slate-800 cursor-pointer border-2 border-violet-300 text-center h-10 w-fit px-2 flex justify-center items-center shadow-2xl rounded-md capitalize text-violet-300 flex-col ">
                          {data.username}
                        </p>
                      )}
                    </div>
                  );
                })}
              </span>

              <div className="cursor-pointer rounded-3xl text-center text-black bg-[#c4b5fd] p-2 flex justify-around items-center">
               
                {/* <span>
                  {Array.from(roomId).map((letter, index) => {
                    return index < 15 ? letter : ".";
                  })}
                </span>{" "} */}
                <p>{roomId}</p>
                <FaRegCopy color="black" />
              </div>
             

              <hr className="border border-[#685a96] w-[100%] my-5 "></hr>
            </div>

            <div className="p-1 flex flex-col justify-between h-[70%]">
             
              <div id="chat" className="overflow-y-scroll">
                <p className="text-center ">chat</p>
              </div>

              <span className="">
                <input
                  onKeyDown={handleMessage}
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  name="message"
                  id="message"
                  className="bg-transparent border border-[#685a96] p-2 w-full rounded-xl text-white outline-numne "
                  placeholder="Type a message here"
                />
              </span>
            </div>

          </div>
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </div>
  );
}
