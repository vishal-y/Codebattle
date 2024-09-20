import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { mainDP } from "../App";
import { useAtom } from "jotai";

const tabs = ["HOME", "ROOM" , "ABOUT"];

export const Chips = ({ text, selectedTab, setSelectedTab }) => {

  const handleSelect = ()=>{
    setSelectedTab(text);
  }

  return (
    <Link
      to={text == "HOME" ? "/" : text.toLowerCase()}
      onClick={handleSelect}
      className={`${
        selectedTab
          ? "text-violet-300"
          : "text-violet-300 hover:text-violet-200 cursor-pointer hover:bg-slate-500 hover:scale-105 p-3 "
      } text-sm transition-colors px-2.5 py-0.5 rounded-md gap-3 relative mx-2`}
    >
      <span className="relative z-10">{text}</span>
      {selectedTab && (
        <motion.span
          layoutId="pill-tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-slate-700 shadow-xl rounded-md"
        ></motion.span>
      )}
    </Link>
  );
};

Chips.propTypes = {
  text: PropTypes.string.isRequired,
  selectedTab: PropTypes.bool.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

export const Navbar = () => {

  const [proDP] = useAtom(mainDP);
  const loggedInuser = localStorage.getItem("token")
  const [showProfile , setShowProfile] = useState(false)
  const [scroll, setScroll] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hide,setHide] = useState("false")

  useEffect(()=>{
    let loc = location.href;
    console.log(loc);
    loc == 'auth' ? setHide(true) : setHide(false)
  },[location.href])

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 150) {
      setScroll(true);
    }

    if (scrollPosition < 100) {
      setScroll(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleLogout = ()=>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <>
    {
      !hide ? 
       <nav
    id="navbar"
    className={`w-full  fixed top-0 z-40 h-[3rem] pt-2`}
    style={{ backdropFilter: scroll ? "blur(8px)" : "blur(0)" }}
  >

    <div className="hidden md:flex w-full justify-between items-start  max-w-7xl mx-auto">
   
      <div className="" onClick={()=>{setSelectedTab("HOME")}}>
       <Link to={"/"} className="text-violet-300 font-bold text-lg">CODEBATTLE</Link>
      </div>

      <div className="ml-[6.5rem] flex justify-evenly">
        {tabs.map((tab) => (
          <Chips
            text={tab}
            selectedTab={selectedTab === tab}
            setSelectedTab={setSelectedTab}
            key={tab}
          />
        ))}
      </div>

      {
        loggedInuser ? 
<div className="z-50 cursor-pointer flex justify-between gap-3 items-center">

{
proDP ?
<div onClick={()=>{setShowProfile(!showProfile)}} className="relative w-6 h-6 lg:w-8 lg:h-8 overflow-hidden bg-gray-100 ring-1 ring-[#c4b5fd] rounded-full dark:bg-gray-600 hover:scale-[1.1]">
  <img src={proDP} className="w-8 h-8 lg:w-10 lg:h-10 object-cover" alt="profile picture" />
</div>
:
<div onClick={()=>{setShowProfile(!showProfile)}} className="relative w-6 h-6 lg:w-8 lg:h-8 overflow-hidden bg-gray-100 ring-2 ring-[#c4b5fd] rounded-full dark:bg-gray-600 hover:scale-[1.1]">
  <svg className="absolute  w-8 h-8 lg:w-10 lg:h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
</div>
}

<div onClick={handleLogout} className="ml-2 px-3 py-1 rounded-md border border-[#685a96] bg-transparent text-[#b4a2fc] text-base w-fit cursor-pointer  transition-all ease-linear duration-75  hover:scale-[1.05] font-medium">Logout</div>

</div>

      :

        <div className="flex gap-3 ">
      <Link to="/auth" className="px-3 py-1 rounded-md border border-[#685a96] bg-transparent text-[#b4a2fc] text-base w-fit cursor-pointer  transition-all ease-linear duration-75  hover:scale-[1.05] font-medium">
            Login
          </Link>
          <Link to="/auth" className="bg-[#b5a3fc] px-3 py-1 rounded-md text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-75 hover:scale-[1.05]">
            Get Started
          </Link>
      </div>
      }

    </div>

    <div className={`${showProfile ? "block" : "hidden"}`}>
      <Profile setShowProfile={setShowProfile} />
    </div>
  </nav> 
  :
  null
    }
    </>
  );
};

export default Navbar