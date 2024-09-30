import { useEffect, useRef, useState } from "react";
import { PanelGroup } from "react-resizable-panels";
import ProblemSet from "../utils/ProblemSet";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { initSocket } from "../socket";
import { useAtom } from "jotai";
import { allMainCode } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import Left from "../RoomComponents/pc/Left";
import Center from "../RoomComponents/pc/center";
import Right from "../RoomComponents/pc/Right";
import PhoneProblemScreen from "../RoomComponents/phone/phoneProblemScreen";
import PhoneCodeScreen from "../RoomComponents/phone/PhoneCodeScreen";
import PhoneRoomScreen from "../RoomComponents/phone/PhoneRoomScreen";
import calculateTimeDifference from "../lib/timeDifference";

export default function Editor() {
  
  const navigator = useNavigate();

  if (!localStorage.getItem("userInfo")) {
    navigator("/auth");
  }

  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState();
  const [isRoom, setIsRoom] = useState(false);
  const [ready, setReady] = useState(false);
  const [mainCode, setMainCode] = useAtom(allMainCode);
  const [outputLoading, setOutputLoading] = useState(false);
  const [phoneProb, setphoneProb] = useState("problem");
  const [admin, setAdmin] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [clients, setClients] = useState([]);
  const [chats, setChats] = useState([]);
  const [output, setOutput] = useState("");
  const [show, setShow] = useState(false);
  const [sharedCode, setSharedCode] = useState("");
  const [questionData, setQuestionData] = useState({
    question: "",
    difficulty: "",
    description: "",
    templatecpp: "",
    templatejava: "",
    solutioncpp: "",
    solutionjava: "",
    testCases: [],
    tags: "",
    expectedValue: "",
    timeComplexity: "",
    spaceComplexity: "",
  });


  const fetchRoomData = async (rID) => {
    try {
      const response = await axios.get(`http://localhost:5000/rooms/${rID}`);
      let data = response.data
      setRoomData(data); 
    } catch (err) {
      console.warn(err.response?.data?.return);
      toast.error("Invalid roomID !", {
        style: { background: "#1e293b", color: "white" },
      });
      navigator("/");
    }
  };

  useEffect(() => {
    if (roomData) {
      console.log("Room Data Updated");
    }
  }, [roomData]);

  useEffect(() => {
    const url = window.location.href.split("/");
    if (url[3] === "problems") {
      setIsRoom(false);
      setReady(true);
    } else {
      const id = window.location.href.split("/");
      setRoomId(id[4])
      fetchRoomData(id[4])
      setIsRoom(true);
      let url = window.location.href;
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      let check = sessionStorage.getItem("StartedTime")
        ? sessionStorage.getItem("StartedTime")
        : null;
      let checkSplit = check?.split(",");
      let checkURL = checkSplit ? checkSplit[0] : null;
      let checkTime = checkSplit ? checkSplit[1] : null;
      if (checkURL == url) {
        const difference = calculateTimeDifference(
          checkTime.slice(0, 8),
          currentTime.slice(0, 8)
        );
        // Calculate total elapsed time in seconds
        const totalElapsedSeconds =
          difference.hours * 3600 +
          difference.minutes * 60 +
          difference.seconds;

        // Retrieve time per question from session storage and convert to seconds
        let timePERQ = parseInt(sessionStorage.getItem("timePQ")) || 0; // Ensure it's a number
        let totalQuestionTimeInSeconds = timePERQ * 60; // Convert to seconds
        let remainingTime =
          (totalQuestionTimeInSeconds - totalElapsedSeconds) / 60;

        if (remainingTime > 0 && remainingTime < 11) {
          countdown(remainingTime);
          setReady(true);
        } else {
          setReady(false);
        }
      } else {
        setReady(false);
      }
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const userJson = JSON.parse(localStorage.getItem("userInfo"));
  const clientUsername = userJson == null ? navigator("/auth") : userJson.username;
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
        let url = window.location.href.split("/");
        let rID = url[4];
        socketRef.current.emit("join", {
          roomId: rID,
          username: clientUsername,
        });
      }

      socketRef.current.on(
        "joined",
        ({ admin, clients, username, roomInfo }) => {
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
        }
      );

      socketRef.current.on("codechange", ({ e }) => {
        language == "cpp" ? setMainCode(e) : setMainCode(e);
      });

      socketRef.current.on("all-message", ({ username, message, time }) => {
        setChats((chats) => [...chats, { username, message, time }]);
      });

      socketRef.current.on("aloneWinner", ({ username }) => {
        let popup = `<div class="flex justify-between items-center bg-transparent border border-green-400 text-green-600 bg-green-200 rounded-xl my-2 py-1">
    <p class="ml-4">There is no one left in this room </br> <span class="font-bold capitalize"> ${username} </span> is the Winner </p>
  </div>`;
        document.getElementById("chat").innerHTML += popup;
        alert(
          `Congratulations ${username}, you are the last person in the room and the winner!`
        );
      });

      socketRef.current.on("send-code", ({ code }) => {
        setSharedCode(code);
        setShow(true);
      });

      socketRef.current.on("player-start", ({ name }) => {
        let popup = `<div class="flex justify-between items-center bg-transparent border border-violet-400 text-violet-400 rounded-xl my-2 py-1">
    <p class="ml-4"><span class="font-bold capitalize">${name} </span> is ready for battle ⚔️. </p>
    <p class="text-xm mr-4">${time()}</p>
  </div>`;
        document.getElementById("chat").innerHTML += popup;
      });

      socketRef.current.on("players-start", ({ start }) => {
        if (start) {
          let popup = `<div class="flex justify-between items-center bg-transparent border border-cyan-400 text-cyan-400 rounded-xl my-2 py-1">
    <p class="ml-4 text-center">Good luck. Battle has been started. 🧑‍💻</p>
    <p class="text-xm mr-4">${time()}</p>
  </div>`;
          document.getElementById("chat").innerHTML += popup;
          setReady(true);
          let timePQ = roomData.timePerQuestion;
          const timerId = countdown(timePQ);
          let url = window.location.href;
          const now = new Date();
          const currentTime = now.toLocaleTimeString();
          sessionStorage.setItem("StartedTime", [url, currentTime]);
          sessionStorage.setItem("timePQ", timePQ);
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

  useEffect(() => {
    console.log("chats");
  }, [chats]);

  let url = window.location.href.split("/");
  let num = parseInt(url[url.length - 1].split("%20").join(" "));
  if (num > 10) {
    num = 1;
  }

  
  useEffect(() => {
    let num = parseInt(url[url.length - 1].split("%20").join(" "));
    if (num > 10) {
      num = 1;
    }
    const problem = ProblemSet[num - 1];
    setQuestionData({
      question: problem.problem,
      difficulty: problem.difficulty,
      description: problem.description,
      templatecpp: problem.template.cpp,
      templatejava: problem.template.java,
      solutioncpp: problem.solution.cpp,
      solutionjava: problem.solution.java,
      testCases: problem.demo.map((i) => ({
        input: i.input,
        output: i.output,
      })),
      tags: problem.tags,
      expectedValue: problem.expectedValue,
      timeComplexity: problem.timeComplexity,
      spaceComplexity: problem.spaceComplexity,
    });
  }, []);

  const tabs = ["Description"];
  const [selected, setSelected] = useState(tabs[0]);

  useEffect(() => {
    let rID = window.location.href.split("/");
    localStorage.getItem("playerReady") == rID[4] ? setReady(true) : console.log("roomId", rID[4]);
  },[]);

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
      }

      countTimeLeft--;
    }, 1000);

    return timer;
  }

  let triedReady = false;
  const handleReady = () => {
    let name = clientUsername;
    const url = window.location.href.split("/");
    let roomId = url[4];
    if (!triedReady) {
      socketRef.current.emit("player-ready", { name, roomId });
      triedReady = true;
    }
    const readyButton = document.getElementById("readyButton");
    readyButton.style.cursor = "not-allowed";
    readyButton.removeEventListener("click", handleReady);
    readyButton.innerHTML = "Waiting for others...";
  };

  const handleVallanguage = (lang) => {
    setMainCode(lang);
    return mainCode;
  };

  const RunCode = async () => {
    setOutputLoading(true);
    let code = localStorage.getItem("code");
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
      if (response.data.stdout == null) {
        setOutput("{}");
        setOutputLoading(false);
        return;
      }

      if (response.data.stdout) {
        setOutput(response.data.stdout);
        setOutputLoading(false);
        return;
      } else {
        setOutput(response.data.stderr);
        setOutputLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setOutput("something wrong :{}");
      setOutputLoading(false);
      return;
    }
  };

  const handleBack = () => {
    const goBack = window.confirm("You want to go back?");
    if (goBack) {
      window.history.back();
    }
  };

  const translateX = {
    room: "translate-x-0",
    problem: "translate-x-[100%]",
    code: "translate-x-[200%]",
  }[phoneProb];

const [isCopied,setIsCopied] = useState(false)

  return (
    <>
      <div className="bg-slate-800 hidden lg:block overflow-hidden">
        <PanelGroup direction="horizontal">
          <Left AboutProblem={questionData} num={num} handleBack={handleBack} />
          <Center
            roomId={roomId}
            clientUsername={clientUsername}
            socketRef={socketRef}
            questionData={questionData}
            output={output}
            outputLoading={outputLoading}
            sharedCode={sharedCode}
            isRoom={isRoom}
            ready={ready}
            setLanguage={setLanguage}
            handleReady={handleReady}
            RunCode={RunCode}
            show={show}
            setShow={setShow}
            language={language}
            handleVallanguage={handleVallanguage}
          />
          {isRoom ? (
            <Right
              clients={clients}
              roomId={roomId}
              admin={admin}
              socketRef={socketRef}
              clientUsername={clientUsername}
              message={message}
              setMessage={setMessage}
              chats={chats}
              isCopied={isCopied}
            />
          ) : null}
        </PanelGroup>
      </div>

      <div className="lg:hidden h-[100vh]">
      
        {isRoom ? (
          <div className="flex justify-evenly gap-3 items-center w-full">
            <div className="h-8 w-8 ml-4 cursor-pointer z-50 flex justify-center shadow-2xl items-center bg-[#5d2ca8] p-2 rounded-full">
              <FaArrowLeftLong
                onClick={handleBack}
                style={{ color: "black" }}
                size={15}
              />
            </div>

            <div className="flex justify-center w-full mx-5 m-auto mt-1 mb-2">
              <div className="relative flex w-full p-1 bg-[#334155] rounded-full">
                <span
                  className="absolute inset-0 m-1 pointer-events-none"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute inset-0 w-1/3 bg-[#5D2CA8] rounded-full shadow-sm shadow-[#5D2CA8] transform transition-transform duration-150 ease-in-out ${translateX}`}
                  ></span>
                </span>
                {["room", "problem", "code"].map((option) => (
                  <button
                    key={option}
                    className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${phoneProb === option ? "text-white" : "text-white/70"}`}
                    onClick={() => setphoneProb(option)}
                    aria-pressed={phoneProb === option}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-[2] mt-2">
            <div className="h-8 w-8 ml-4 cursor-pointer z-50 flex justify-center shadow-2xl items-center bg-[#5d2ca8] p-2 rounded-full">
              <FaArrowLeftLong
                onClick={handleBack}
                style={{ color: "black" }}
                size={15}
              />
            </div>

            <div className="flex w-[80vw] justify-center max-w-[14rem] m-auto mb-3">
              <div className="relative flex w-full p-1 bg-[#334155] rounded-full">
                <span
                  className="absolute inset-0 m-1 pointer-events-none"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute inset-0 w-1/2 bg-[#5D2CA8] rounded-full shadow-sm shadow-[#5D2CA8] transform transition-transform duration-150 ease-in-out ${phoneProb == "problem" ? "translate-x-0" : "translate-x-full"}`}
                  ></span>
                </span>
                <button
                  className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${phoneProb ? "text-white/70" : " text-white"}`}
                  onClick={() => setphoneProb("problem")}
                  aria-pressed={phoneProb}
                >
                  Problem
                </button>
                <button
                  className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${phoneProb ? "text-white/70" : " text-white"}`}
                  onClick={() => setphoneProb("code")}
                  aria-pressed={phoneProb}
                >
                  Code
                </button>
              </div>
            </div>
          </div>
        )}

        {phoneProb == "problem" ? (
          <PhoneProblemScreen
            tabs={tabs}
            selected={selected}
            setSelected={setSelected}
            questionData={questionData}
            num={num}
          />
        ) : null} 

        {phoneProb == "code" ? (
          <>
            <PhoneCodeScreen
              language={language}
              setLanguage={setLanguage}
              ready={ready}
              setReady={setReady}
              show={show}
              setShow={setShow}
              sharedCode={sharedCode}
              setSharedCode={setSharedCode}
              output={output}
              setOutput={setOutput}
              outputLoading={outputLoading}
              RunCode={RunCode}
              socketRef={socketRef}
              roomId={roomId}
              clientUsername={clientUsername}
              questionData={questionData}
              handleVallanguage={handleVallanguage}
            />
          </>
        ) : null}

        {phoneProb == "room" ? (
          <PhoneRoomScreen
            clients={clients}
            roomId={roomId}
            admin={admin}
            clientUsername={clientUsername}
            socketRef={socketRef}
            message={message}
            setMessage={setMessage}
            chats={chats}
          />
        ) : null}

      </div>
    </>
  );
}