import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemSet from "../utils/ProblemSet";
import { FaArrowLeftLong, FaPlay } from "react-icons/fa6";
import toast from "react-hot-toast";
import Chip from "../components/Chip";
import { useNavigate } from "react-router-dom";
import { DiCodeigniter } from "react-icons/di";
import { initSocket } from "../socket";
import { useAtom } from "jotai";
import { allMainCode } from "../App";
import Programmers from "../RoomComponents/Programmers";
import Chat from "../RoomComponents/Chat";
// import EditorWrap from "../RoomComponents/EditorWrap";
import MainEditor from "../components/MainEditor";
import ShareEditor from "../components/ShareEditor";
import { TiDeleteOutline } from "react-icons/ti";
import HomeEditor from "../components/HomeEditor";
import axios from "axios";

export default function Editor() {
  const navigator = useNavigate();

  const [mainCode, setMainCode] = useAtom(allMainCode);

  const [admin, setAdmin] = useState("");
  const [ready, setReady] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [questionDiff, setQuestionDiff] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [templatecpp, setTemplatecpp] = useState("");
  const [templatejava, setTemplatejava] = useState("");
  const [solutioncpp, setsolutioncpp] = useState("");
  const [solutionjava, setsolutionjava] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [show, setshow] = useState(false);
  const [sharedCode, setSharedCode] = useState("");
  // const [questionApproach , setQuestionApproach] = useState("")
  const [questionInfo, setQuestionInfo] = useState({
    tags: "",
    expectedValue: "",
    timeComplexity: "",
    spaceComplexity: "",
  });

  if (!localStorage.getItem("token") && !localStorage.getItem("userInfo")) {
    navigator("/auth");
  }

  const userJson = JSON.parse(localStorage.getItem("userInfo"));
  const clientUsername = userJson.username;
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (e) =>
        console.log("cause of error : ", e)
      );
      socketRef.current.on("connect_failed", (e) =>
        console.log("cause of error : ", e)
      );

      if (clientUsername) {
        socketRef.current.emit("join", {
          roomId,
          username: clientUsername,
        });
      }

      socketRef.current.on("joined", ({ admin, clients, username }) => {
        const admin_function = () => {
          setAdmin(admin);
        };
        admin_function();
        setClients(clients);
        let popup = `<div class="flex justify-between items-center bg-transparent border border-green-500 text-green-500 rounded-xl my-2 py-1">
        <p class="ml-4 capitalize"> ${username == clientUsername ? "You have" : username + " has "}  joined the room </p>
        <p class="text-xm mr-4">${time()}</p>
      </div>`;
        document.getElementById("chat").innerHTML += popup;
      });

      socketRef.current.on("codechange", ({ e }) => {
        language == "cpp" ? setMainCode(e) : setMainCode(e);
      });

      socketRef.current.on("all-message", ({ username, message, time }) => {
        let side =
          username == clientUsername
            ? "justify-end"
            : "justify-start";
        let popup = `<div class="h-fit p-2 flex ${side} ">
        <div class="bg-slate-800 w-fit px-3 p-1 rounded-2xl flex flex-col gap-2">
        <div class="text-xs capitalize flex justify-between gap-2 items-center text-violet-500"> <p>${username}</p> <p>${time}</p> </div>
        <p>${message}</p>
        </div>
      </div>`;
        let chatEle = document.getElementById("chat");
        chatEle.innerHTML += popup;
      });

      socketRef.current.on("send-code", ({ code }) => {
        setSharedCode(code);
        setshow(true);
      });

      socketRef.current.on("player-start", ({ name }) => {
        let popup = `<div class="flex justify-between items-center bg-transparent border border-violet-400 text-violet-400 rounded-xl my-2 py-1">
    <p class="ml-4"><span class="font-bold capitalize">${name} </span> is ready for battle ⚔️. </p>
    <p class="text-xm mr-4">${time()}</p>
  </div>`;
        document.getElementById("chat").innerHTML += popup;
      });

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

  let url = window.location.href.split("/");
  let num = parseInt(url[url.length - 1].split("%20").join(" "));
  if (num > 10) {
    num = 1;
  }

  useEffect(() => {
    setRoomId(url[url.length - 2].split("%20").join(" "));

    setClients([...clients, { socketId: 3, username: clientUsername }]);

    setQuestion(ProblemSet[num - 1].problem);
    setQuestionDiff(ProblemSet[num - 1].difficulty);
    setQuestionDesc(ProblemSet[num - 1].description);
    setTemplatecpp(ProblemSet[num - 1].template.cpp);
    setTemplatejava(ProblemSet[num - 1].template.java);
    setsolutioncpp(ProblemSet[num - 1].solution.cpp);
    setsolutionjava(ProblemSet[num - 1].solution.java);

    ProblemSet[num - 1].demo.forEach((i) => {
      document.getElementById("testCase").innerHTML +=
        `<li class="py-2 flex flex-col"> <span>${i.input}</span> ouput : ${i.output}</li>`;
    });

    setQuestionInfo({
      tags: ProblemSet[num - 1].tags,
      expectedValue: ProblemSet[num - 1].expectedValue,
      timeComplexity: ProblemSet[num - 1].timeComplexity,
      spaceComplexity: ProblemSet[num - 1].spaceComplexity,
    });
  }, []);

  const tabs = ["Description", "Code"];
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
    let name = clientUsername;
    socketRef.current.emit("player-ready", { name });
    document.getElementById("readyButton").innerHTML = "Waiting for others...";
  };

  const handleVallanguage = (lang) => {
    setMainCode(lang);
    return mainCode;
  };

  const RunCode = async () => {
    let code = localStorage.getItem("code");

    // let convertedCode = code.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    // console.log("convertedCode\n" , code , "\n pre written" ,  "#include <bits/stdc++.h>;\nusing namespace std;\n\nint main() {\n        \n    cout<<\"this\";\n        \n    return 0;\n}\n        ")

    const extensions = { cpp: "cpp", python: "py", c: "c", javascript: "js" };
    const extension_name = extensions[language];

    const options = {
      method: "POST",
      url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d0e6d53bc1msh2d8e67dd2576a12p12a4cbjsnd9c841ba8378",
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: language,
        files: [
          {
            name: `main.${extension_name}`,

            content: code,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.stdout);
      if (response.data.stdout) {
        setOutput(response.data.stdout);
      } else {
        setOutput(response.data.stderr);
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div className="bg-slate-800 overflow-hidden">
      <PanelGroup direction="horizontal">
        <div className="hidden h-full w-screen absolute justify-center items-center z-40 bg-black/[55%] ">
          <div className="h-[25vh] w-[35vw] rounded-3xl bg-slate-900"></div>
        </div>

        <Panel
          defaultSize={28}
          minSize={26}
          maxSize={31}
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

            <div id="desc" className="h-full  max-h-[90%] overflow-y-scroll">
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
              <div className="mt-6">
                Expected Value :{" "}
                <div className=" bg-slate-800 rounded-xl my-1 mt-2 p-2">
                  {questionInfo.expectedValue}
                </div>
              </div>

              <div className="mt-3 mb-1 flex items-center justify-start">
                Expected Time complexity :{" "}
                <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
                  {questionInfo.timeComplexity}
                </div>
              </div>

              <div className="mt-1 mb-3 flex items-center justify-start">
                Expected Expected Space complexity :{" "}
                <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
                  {questionInfo.spaceComplexity}
                </div>
              </div>
              <p>Test cases : </p>

              <div
                id="testCase"
                className="p-2 bg-slate-800 rounded-xl my-2 overflow-y-scroll"
              ></div>
            </div>

            <div className="hidden w-[20rem] border max-w-[20rem]" id="sol">
              {/* <pre>{questionApproach}</pre> */}
            </div>

            <div className="hidden" id="sub">
              <div className=" box-inset border border-[#685a96] rounded-md">
                <HomeEditor
                  code={language == "cpp" ? solutioncpp : solutionjava}
                  doAnimate={false}
                />
              </div>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle />

        <Panel className="mr-1">
          <PanelGroup direction="vertical">
            <Panel className="h-full p-4 text-white rounded-2xl bg-[#100821] m-1 mr-0">
              <div className=" w-full h-[8%] pb-4 flex justify-between items-center px-1">
                <select
                  id="language"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
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
                  <DiCodeigniter size={25} className="hover:text-amber-500" />
                </span>
              </div>

              <div className="h-[90%]">
                {show ? (
                  <div className="h-full">
                    <div className="bg-violet-300 text-black font-medium capitalize px-1 py-1 rounded-md mb-2 flex justify-between items-center">
                      <span id="whoscode">
                        You are currenty looking at code
                      </span>
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
                          ? handleVallanguage(templatecpp)
                          : handleVallanguage(templatejava)
                      }
                    />
                  </div>
                )}
              </div>

              {/* <EditorWrap show={show} setshow={setshow} sharedCode={sharedCode} language={language} solutioncpp={solutioncpp} solutionjava={solutionjava} mainCode={mainCode} setMainCode={setMainCode} roomId={roomId} socketRef={socketRef} clientUsername={clientUsername} /> */}
            </Panel>
            <PanelResizeHandle />

            <Panel defaultSize={10} maxSize={35} minSize={10}>
              <PanelGroup direction="horizontal">
                <Panel className="border border-[#1f1f1f] p-4 text-white rounded-2xl bg-[#100821] m-1 mt-0 mr-0">
                  <div className="flex justify-between items-center">
                    <p>OUTPUT : {output} </p>
                    <FaPlay
                      size={25}
                      onClick={RunCode}
                      className="hover:text-violet-300"
                    />
                  </div>
                </Panel>
                <PanelResizeHandle />
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />

        <Panel
          defaultSize={23}
          minSize={23}
          maxSize={30}
          className="h-[98.9vh] min-h-[40rem] mr-2 mt-1 border border-[#1f1f1f] text-white rounded-2xl bg-[#100821] "
        >
          <div className="h-full">
            <Programmers
              clients={clients}
              roomId={roomId}
              admin={admin}
              socketRef={socketRef}
              clientUsername={clientUsername}
            />

            <Chat
              message={message}
              setMessage={setMessage}
              roomId={roomId}
              socketRef={socketRef}
              clientUsername={clientUsername}
            />
          </div>
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </div>
  );
}
