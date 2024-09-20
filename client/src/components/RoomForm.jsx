import { useEffect, useRef, useState } from "react";
import Chip from "./Chip";
import { uid } from 'uid';
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types'
import { TiDeleteOutline } from "react-icons/ti";

export default function RoomForm({setRoomForm}) {

  const navigator = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("userInfo") && !localStorage.getItem("token")){
      navigator("/auth")
    }
  },[])

  const inp = useRef("");
  const [created , setCreated] = useState(false)
  const [roomID , setRoomId] = useState("")

  const tabs = ["EASY", "MEDIUM" , "HARD"];
  const [selected, setSelected] = useState(tabs[0]);

  let val = uid(32)

  const handleCreate = () => {
  
    document.getElementById("RoomInp").value = val;
    setRoomId(val);
  
    try {
      navigator.clipboard.writeText(val);
      document.getElementById("copybtn").value = "COPIED TO CLIPBOARD";
    } catch (error) {
      setCreated(true);
      alert("room created");
      sessionStorage.setItem("room", "owner");
      navigator(`/codebattle/${val}/1`);
    }
  };
  
  const handleEnter = ()=>{
    if ( roomID ){
      window.location.href = `/codebattle/${roomID}/1`;
    }
    inp.current.focus();
    inp.current.style.border="1px solid red"; 
    setTimeout(() => {
      inp.current.style.border="1px solid #685a96"; 
    },3000);
  }
  

  return (
    <div className="flex w-screen absolute backdrop-blur-sm top-0 z-[99] justify-center items-center h-screen">
    {

      localStorage.getItem("userInfo") && localStorage.getItem("token") ? 
      <div className="bg-slate-800 border-2 border-violet-300 h-[60vh] w-[25vw] shadow-2xl rounded-lg p-5">

    <div className="flex justify-between mb-8 items-center">
    <p className="text-white ">ROOM</p>
    <TiDeleteOutline
            onClick={()=>{setRoomForm(false)}}
            size={25}
            className="cursor-pointer hover:bg-violet-300 text-violet-300 rounded-full hover:text-black"
          />
    </div>
  <div className="flex justify-between items-center p-2  gap-2">
    <p className="text-white">DIFFICULTY</p>

 {tabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
            />
          ))}

  </div>

  <div  className="w-full flex justify-between p-2">
    <p className="text-white">TIME </p>
    <span className="flex justify-end"> 
    <input type="text" name=""  className="w-[60%] hover:shadow-2xl focus:shadow-2xl  placeholder:ml-1 transition-all ease-linear duration-75 p-2 bg-transparent outline-none border border-[#685a96]  rounded-l-md text-white " placeholder="TIME PER PROBLEM"/>
    <p className="text-black bg-[#b5a3fc] w-[20%] text-center flex justify-center items-center text-sm rounded-r-md">MIN</p>
    </span>
  </div>


<span className="flex flex-col justify-center items-center gap-3">
<input ref={inp} value={roomID} onChange={(e)=>{setRoomId(e.target.value)}} id="RoomInp" type="text" name=""  className="hover:scale-105 hover:shadow-2xl focus:shadow-2xl focus:scale-105 placeholder:ml-1 transition-all ease-linear duration-75 p-2 bg-transparent outline-none border border-[#685a96] w-full rounded-md text-white " placeholder="ENTER ROOM ID HERE"/>

{

!created ? <p className="font-bold hover:scale-105 hover:shadow-2xl transition-all cursor-pointer ease-linear duration-75 bg-[#b5a3fc] text-center rounded-md p-2 w-full" onClick={handleEnter}>ENTER</p> 

:

<p id="copyBtn" className="font-bold hover:scale-105 hover:shadow-2xl transition-all cursor-pointer ease-linear duration-75 bg-[#b5a3fc] text-center rounded-md p-2 w-full">ENTER 1</p>

}

<p className="text-white w-[100%] text-center text-sm">DONT HAVE ROOM ID ? <span className="text-violet-300 font-bold hover:underline cursor-pointer hover:text-violet-200" onClick={handleCreate}>CREATE</span> NOW.</p>
</span>

    </div>

    :

    null

    }

    </div>
  )
}
RoomForm.propTypes={
  setRoomForm : propTypes.func
}