import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProblemSet from "../utils/ProblemSet";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { Plus , MagnifyingGlass } from "@phosphor-icons/react";
import RoomForm from "../components/RoomForm";

const tagsName = [
  "Array",
  "Strings",
  "Stack",
  "Queue",
  "Linked List",
  "Searching Algorithms",
  "Tree",
  "Graph",
  "Sorting Algorithms",
  "Divide and Conquer Algorithms",
  "Recursion",
  "Backtracking",
  "Dynamic Programming",
];

let SelectedTag = [];

const Tags = ({ TagName }) => {
  const [isClick, setIsClick] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#334155]");

  const handleTags = (e) => {
    if (!isClick) {
      SelectedTag.push(e.target.textContent);
      setBgColor("bg-violet-700");
      setIsClick(true);
    } else {
      SelectedTag.pop();
      setBgColor("bg-[#334155]");
      setIsClick(false);
    }
    console.log(SelectedTag);
  };

  return (
    <p
      onClick={handleTags}
      className={`cursor-pointer transition-all ${bgColor} duration-75 ease-in-out hover:bg-violet-600 hover:border border border-slate-400 w-fit  p-1 h-fit text-sm rounded-lg hover:scale-105`}
    >
      {TagName}
  </p>
  );
};
Tags.propTypes = {
  TagName: PropTypes.string.isRequired,
};


export default function Problems() {

  // const [isLiked,setIsLiked] = useState(false)
  const [roomForm,setRoomForm] = useState(false)
  const [randomNumber, setRandomNumber] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");

  useLayoutEffect(() => {
    let num;
    if (!sessionStorage.getItem("RandomNumber")) {
      num = Math.floor(Math.random() * ProblemSet.length);
      sessionStorage.setItem("RandomNumber", num);
    } else {
      num = parseInt(sessionStorage.getItem("RandomNumber"), 10);
    }
    setRandomNumber(num);
  }, []);


  useEffect(() => {
    if(window.innerWidth > 600){
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    }
  }, []);

  useEffect(() => {
    if (document.getElementById("navbar")) {
      document.getElementById("navbar").style.display = "block";
    }
  }, []);

  const randomProblem = ProblemSet[randomNumber];

  const [search,setSearch] = useState("")

  const controls = useAnimation();
  const any = useAnimation();

  const handleFocus = () => {
    any.start({marginTop : "20vh"})
    controls.start({ height : "100vh" , background : "rgba(255, 255, 255, 0.5);" , backdropFilter: "blur(16px)"  , transition: { duration: 0.3 } });
  };


  const [searchResult, setSearchResults] = useState([]);
  
  const handleBlur = () => {
    setTimeout(() => {
    setSearch("")
    setSearchResults(false)
    any.start({ backdropFilter: "blur(10px)" })
    controls.start({ y: '0%', height : "auto"  , backdropFilter: "blur(0px)" , transition: { duration: 0.3 } });
    }, 200);
  };

const handleSearch = (value) => {
  setSearch(value);
  if (!value) {
    setSearchResults([]);
    return;
  }
  const results = ProblemSet.filter(problem => 
    problem.problem.toLowerCase().includes(value.toLowerCase()) || 
    problem.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
  );
  console.log(searchResult , searchResult.length)
  setSearchResults(results);
};


  return (
   <>
   
   <div className="w-screen overflow-hidden pb-2 gap-4 px-4 flex md:hidden flex-col justify-center ">

    
<div className="mt-[5rem]">
 
 <div className="border p-3 text-white bg-gradient-to-b from-[#5D2CA8] to-black h-full w-full rounded-xl">
   <p className="font-bold text-lg ml-3">Create a room</p>
   <div className="flex justify-between items-center gap-2 p-2">
 
     <div onClick={()=>{setRoomForm(true)}} className="h-[3rem] hover:bg-violet-500 hover:scale-[1.03] cursor-pointer transition-all ease-in-out duration-150 hover:shadow-xl w-full rounded-lg flex justify-center items-center border border-slate-400 bg-violet-600 gap-2">
       Create Room <Plus size={16} color="white" />
     </div>
   </div>

 </div>

 <motion.div className="fixed bottom-0 left-0 px-6 py-3 w-full" animate={controls}>
    <motion.div
      animate={any}
      className="text-white flex justify-center items-center h-10 rounded-full mt-2 border border-slate-100 backdrop-blur-md"
    >
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)} // Call the new search function
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        type="search"
        name="search"
        id="search"
        className="w-[85%] h-full backdrop-blur-xl rounded-l-full bg-transparent outline-none pl-5"
        autoComplete="off"
        placeholder="Search..."
      />
      <button
        className="w-[15%] hover:shadow-lg h-full flex justify-center items-center rounded-r-full"
      >
        <MagnifyingGlass size={25} />
      </button>
    </motion.div>

    { searchResult.length > 0 && (  
  <motion.div
    initial={{ maxHeight: "0px" }}
    animate={{ maxHeight: "500px" }} // Adjust this value as needed
    exit={{ maxHeight: "0px" }}
    transition={{ duration: 0.5, ease: "easeIn" }}
    className="px-2 py-3 overflow-y-scroll border rounded-lg mt-5 text-white overflow-hidden"
  >
    <p className="font-bold text-lg ml-3">Your search results</p>
    {searchResult.map((result, index) => (
      <div key={index} className="flex mt-3 justify-between w-full items-center border border-slate-300 py-2 px-3 rounded-md ">
        <div className="text-sm font-normal text-start w-[80%] max-w-[60%] text-gray-50">
          {result.problem}
        </div>
        <div className="w-[20%] flex justify-between items-center gap-2">
          {/* <span className={
            result.difficulty === "Easy"
              ? "text-green-700 bg-green-200 text-center rounded-md py-1 px-2 text-sm"
              : result.difficulty === "Medium"
              ? "text-yellow-600 bg-yellow-50 text-center rounded-md py-1 px-2 text-sm"
              : result.difficulty === "Hard"
              ? "text-red-600 bg-red-200 text-center rounded-md py-1 px-2 text-sm"
              : ""
          }>
            {result.difficulty}
          </span> */}
          <Link
            to={`codebattle/${result.problemID}`} // Adjust this path as needed
            className="p-1 hover:scale-[1.05] transition-all ease-in-out duration-200 border-slate-300 hover:border hover:bg-purple-700 text-sm border bg-violet-600 rounded-lg px-2"
          >
            Solve
          </Link>
        </div>
      </div>
    ))}
  </motion.div>
  )
}

  </motion.div>

</div>



<caption className="h-[7rem] border text-white p-2 w-s bg-[#5D2CA8] rounded-lg text-lg font-normal text-left rtl:text-right">
      Random problem
      <br />
      {randomProblem ? (
        <div className="flex mt-3 justify-between  w-full items-center bg-violet-500 py-2 px-3 rounded-md">
          <div className="text-sm font-normal text-start text-gray-50">
            {randomProblem.problem}
          </div>
       <div className="w-[38%] flex justify-between items-center gap-2">
       <span
            className={
              randomProblem.difficulty === "Easy"
                ? "text-green-700 bg-green-200 text-center rounded-md py-1 px-2 text-sm"
                : randomProblem.difficulty === "Medium"
                ? "text-yellow-600 bg-yellow-50 text-center rounded-md py-1 px-2 text-sm"
                : randomProblem.difficulty === "Hard"
                ? "text-red-600 bg-red-200 text-center rounded-md py-1 px-2 text-sm"
                : ""
            }
          >
            {randomProblem.difficulty}
          </span>
          <Link
            to={`codebattle/${randomNumber}`}
            className="p-1 hover:scale-[1.05] transition-all ease-in-out duration-200 border-slate-300 hover:border hover:bg-purple-700 text-sm border bg-violet-600 rounded-lg px-2"
          >
            Solve
          </Link>
       </div>
        </div>
      ) : (
        <div className="text-red-500">No problem available</div>
      )}
    </caption>

<section id="phoneTable" className="">
  <div className="w-full mb-8 overflow-hidden border rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm text-white bg-[#5c2ca6] tracking-wide text-left uppercase ">
            <th className="px-4 border py-3">TITLE</th>
            <th className="px-4 border py-3">DIFICULTY</th>
            <th className="px-4 border py-3">TAGS</th>
            {/* <th className="px-4 border py-3">FAVOURITE</th> */}
            <th className="px-4 border py-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="text-white bg-gradient-to-b from-[#5D2CA8] to-black">
  {ProblemSet.map((e, i) => (
    <tr key={i} className="border-y-2">
      <td className="pl-3 w-[55vw] py-3 flex ">
        <div className="flex justify-center items-center text-sm">
          <div>
          <Link className="" to={`codebattle/${i + 1}`}>
              {i + 1 + ". " + e.problem}
            </Link>
          </div>
        </div>
      </td>
      <td className="px-4 border py-3 text-md font-semibold">
        <p className={`text-center rounded-md py-1 ${e.difficulty === "Easy" ? "text-green-700 bg-green-200" : e.difficulty === "Medium" ? "text-yellow-600 bg-yellow-50" : e.difficulty === "Hard" ? "text-red-600 bg-red-200" : ""}`}>
          {e.difficulty}
        </p>
      </td>
      <td className="px-4 gap-2 flex flex-wrap mt-4 text-xs">
        {e.tags.map((tag, index) => (
          <span key={index} className="bg-gray-500 text-xs p-1 rounded-md mx-1">
            {tag}
          </span>
        ))}
      </td>
      {/* <td className="px-4 border py-3">
        {
          isLiked ?
          <Heart onClick={()=>{setIsLiked(!isLiked)}} size={22} weight="fill" color="hotpink" className="ml-7"/>
          :
          <Heart onClick={()=>{setIsLiked(!isLiked)}} size={22} className="ml-7"/>
        }
      </td> */}
      <td className="px-4 border py-3 text-xs">
        <Link to={`codebattle/${i + 1}`} className="p-2 transition-all ease-in-out duration-200 hover:bg-purple-700 bg-violet-600 rounded-lg px-3">
          Solve
        </Link>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  </div>
</section>

</div>


<div className="h-screen w-screen gap-4 lg:px-5 xl:px-20 xll:px-32 hidden md:flex justify-center ">


<div className="relative lg:w-full xl:w-full xll:w-[62vw]  mt-[5rem] h-full overflow-x-scroll border rounded-xl shadow-md sm:rounded-lg text-white bg-gradient-to-b from-[#5D2CA8] to-black">
  <table className="w-full text-sm text-left rtl:text-right ">
    <caption className="sticky top-0 bg-[#5D2CA8] rounded-tr-lg rounded-tl-lg p-5 text-lg font-normal text-left rtl:text-right">
      Random problem
      <br />
      {randomProblem ? (
        <div className="flex justify-between items-center w-full bg-violet-500 py-2 px-3 rounded-md">
          <div className="text-base text-gray-50 truncate mb-1 sm:mb-0">
            {randomProblem.problem}
          </div>
          <span
            className={
              randomProblem.difficulty === "Easy"
                ? "text-green-700 bg-green-200 text-center rounded-md py-[.5] px-2 text-sm"
                : randomProblem.difficulty === "Medium"
                ? "text-yellow-600 bg-yellow-50 text-center rounded-md py-[.5] px-2 text-sm"
                : randomProblem.difficulty === "Hard"
                ? "text-red-600 bg-red-200 text-center rounded-md py-[.5] px-2 text-sm"
                : ""
            }
          >
            {randomProblem.difficulty}
          </span>
          <span className="text-sm ml-2 bg-slate-500 px-2 py-[0.5] rounded-lg">
            {randomProblem.tags.join(", ")}
          </span>
          <Link
            to={`codebattle/${randomNumber}`}
            className="p-2 hover:scale-[1.05] transition-all ease-in-out duration-200 border-slate-300 hover:border hover:bg-purple-700 text-sm border bg-violet-600 rounded-lg px-3"
          >
            Solve
          </Link>
        </div>
      ) : (
        <div className="text-red-500">No problem available</div>
      )}
    </caption>

    <thead className="text-xs text-white uppercase bg-[#8249f1] border-t border-b shadow-lg ">
      <tr>
        <th scope="col" className="px-6 py-3 ">
          Title
        </th>
        <th scope="col" className="px-6 py-3 ">
          Difficulty
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Tags
        </th>
        {/* <th scope="col" className="px-6 py-3">
          Favourite
        </th> */}
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
          <span>Action</span>
        </th>
      </tr>
    </thead>

    <tbody>
      {ProblemSet.map((e, i) => (
        <tr key={i} className="border-b">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
           <Link to={`codebattle/${i+1}`}>
           {i + 1 + ". " + e.problem}
           </Link>
          </th>
          <td className="px-6 py-4">
            <p
              className={
                e.difficulty === "Easy"
                  ? "text-green-700 bg-green-200 text-center rounded-md py-1"
                  : e.difficulty === "Medium"
                    ? "text-yellow-600 bg-yellow-50 text-center rounded-md py-1"
                    : e.difficulty === "Hard"
                      ? "text-red-600 bg-red-200 text-center rounded-md py-1"
                      : ""
              }
            >
              {e.difficulty}
            </p>
          </td>
          <td className="py-4 text-center ">
            {e.tags.map((tag, i) => {
              return (
                <span
                  key={i}
                  className="bg-gray-500 text-xs p-1 rounded-md mx-1"
                >
                  {tag}
                </span>
              );
            })}
          </td>
          {/* <td className="px-6 py-4 flex items-center">
            <span className="HeartAnimation"></span>
          </td> */}
          <td className="px-6 py-4">
            <Link
              to={`codebattle/${i + 1}`}
              className="p-2 transition-all ease-in-out duration-200 hover:bg-purple-700 bg-violet-600 rounded-lg px-3"
            >
              Solve
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="mt-[5rem]">
 
  <div className="border p-2 text-white bg-gradient-to-b from-[#5D2CA8] to-black min-h-[5rem] h-[7rem] lg:w-full rounded-xl">
    <p className="font-bold text-base ml-3">Challenge your friends.</p>
    <div className="flex justify-between items-center gap-2 p-2">
      {/* <div className="h-[3.5rem] hover:bg-violet-500 hover:scale-[1.03] cursor-pointer transition-all ease-in-out duration-150 hover:shadow-xl w-full rounded-lg flex justify-center items-center border border-slate-400 bg-violet-600 gap-2">
        Join Room <Plus size={16} color="white" />{" "}
      </div> */}
      <div onClick={()=>{setRoomForm(true)}} className="h-[3.5rem] hover:bg-violet-500 hover:scale-[1.03] cursor-pointer transition-all ease-in-out duration-150 hover:shadow-xl w-full rounded-lg flex justify-center items-center border border-slate-400 bg-violet-600 gap-2">
        Create Room <Plus size={16} color="white" />{" "}
      </div>
    </div>
  </div>

  <div className="col-span-12 mt-3 md:col-span-3 max-md:max-w-md max-md:mx-auto ">
    <div className="box rounded-xl border border-purple-300 bg-gradient-to-b from-[#5D2CA8] to-black text-white p-6 w-full md:max-w-sm">
        
<div className="w-full mb-4">   
<label htmlFor="default-search" className="text-lg font-bold ">Search</label>
<div className="bg-[#334155] flex justify-center items-center h-10 rounded-full mt-2 border border-slate-400">
  <input onBlur={()=>{setTimeout(() => {
    setSearchResults(false)
  }, 100);}} value={search} onChange={(e) => handleSearch(e.target.value)} type="search" name="search" id="search" className="w-[75%] h-full rounded-l-full bg-transparent outline-none hover:outline-none pl-4" autoComplete="off" placeholder="Search..." />
  <button className="bg-violet-600 hover:bg-violet-500 w-[25%] hover:shadow-lg h-full flex justify-center items-center rounded-r-full"><MagnifyingGlass size={18}/></button>
</div>
</div>

    
{
  searchResult.length > 0 ? 
    <motion.div
    initial={{ maxHeight: "0px" }}
    animate={{ maxHeight: "500px" }} // Adjust this value as needed
    exit={{ maxHeight: "0px" }}
    transition={{ duration: 0.5, ease: "easeIn" }}
    className="px-2 py-3 mb-4 min-h-[5rem] backdrop-blur-xl overflow-y-scroll border rounded-lg mt-5 text-white overflow-hidden"
  >
    <p className="font-bold text-lg ml-3">Your search results</p>
    {searchResult.map((result, index) => (
      <div key={index} className="flex mt-3 justify-between w-full items-center border border-slate-300 py-2 px-3 rounded-md ">
        <div className="text-sm font-normal text-start w-[80%] max-w-[60%] text-gray-50">
          {result.problem}
        </div>
        <div className="w-[20%] flex justify-between items-center gap-2">
          {/* <span className={
            result.difficulty === "Easy"
              ? "text-green-700 bg-green-200 text-center rounded-md py-1 px-2 text-sm"
              : result.difficulty === "Medium"
              ? "text-yellow-600 bg-yellow-50 text-center rounded-md py-1 px-2 text-sm"
              : result.difficulty === "Hard"
              ? "text-red-600 bg-red-200 text-center rounded-md py-1 px-2 text-sm"
              : ""
          }>
            {result.difficulty}
          </span> */}
          <Link
            to={`codebattle/${result.problemID}`}
            className="p-1 hover:scale-[1.05] transition-all ease-in-out duration-200 border-slate-300 hover:border hover:bg-purple-700 text-sm border bg-violet-600 rounded-lg px-2"
          >
            Solve
          </Link>
        </div>
      </div>
    ))}
  </motion.div>
  :
  null
}




      <h6 className="font-bold -mt-2 text-lg leading-7  mb-2">
        Choose your topic
      </h6>

      <div className="flex flex-wrap gap-1">
        {tagsName.map((ele, i) => {
          return <Tags key={i} TagName={ele} />;
        })}
      </div>

      <p className="mt-4 mb-3 text-lg font-bold">Difficulty</p>

      <div className="flex justify-center w-full ">
        <div className="relative flex w-full p-1 bg-[#334155] rounded-full">
          <span
            className="absolute inset-0 m-1 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/3 bg-violet-600 rounded-full shadow-sm shadow-[#5D2CA8] transform transition-transform duration-150 ease-in-out ${difficulty == "easy" ? "translate-x-0" : null} ${difficulty == "medium" ? "translate-x-[100%]" : null} ${difficulty == "hard" ? "translate-x-[200%]" : null}`}
            ></span>
          </span>
          <button
            className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${difficulty ? "text-white/70" : " text-white"}`}
            onClick={() => setDifficulty("easy")}
            aria-pressed={difficulty}
          >
            Easy
          </button>
          <button
            className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${difficulty ? "text-white/70" : " text-white"}`}
            onClick={() => setDifficulty("medium")}
            aria-pressed={difficulty}
          >
            Medium
          </button>
          <button
            className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${difficulty ? "text-white/70" : " text-white"}`}
            onClick={() => setDifficulty("hard")}
            aria-pressed={difficulty}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="w-full rounded-full bg-violet-600 p-2 text-center mt-8 hover:scale-[1.05] hover:bg-violet-400 cursor-pointer transition-all duration-150 ease-in-out">
        Find
      </div>
    </div>
  </div>

</div>

</div>

{
  roomForm && (
<RoomForm setRoomForm={setRoomForm}/>
  )
}

   </>
  );
}
