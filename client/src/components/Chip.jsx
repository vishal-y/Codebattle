import PropTypes from "prop-types";
import { motion } from "framer-motion";



export default function Chip ({ login=false  , setShow ,   text, selected, setSelected })  {

    const handleSelect = (e)=>{
      setSelected(text);
     
      if(!login){
        if (e.target.textContent == "Description") {
          document.getElementById("desc").style.display = "block";
          document.getElementById("sol").style.display = "none";
          document.getElementById("sub").style.display = "none";
        } else if (e.target.textContent == "Approach") {
          document.getElementById("desc").style.display = "none";
          document.getElementById("sol").style.display = "block";
          document.getElementById("sub").style.display = "none";
        } else if (e.target.textContent == "Code") {
          document.getElementById("desc").style.display = "none";
          document.getElementById("sol").style.display = "none";
          document.getElementById("sub").style.display = "block";
        }
      }
      else{
        console.log(e.target.textContent);
        let click = e.target.textContent;
        if(click=="SIGN UP"){
          setShow(false)
        }
        else{
          setShow(true)
        }
      }

    };
  
  
    return (
      <p
        to={text == "HOME" ? "/" : text.toLowerCase()}
        onClick={handleSelect}
        className={`${
          selected && login ? "text-black"
          : selected 
            ? "text-violet-300"
            : "text-violet-300 hover:text-violet-200 cursor-pointer hover:bg-slate-500 hover:scale-105 p-3 "
        } text-sm transition-colors px-2.5 py-0.5 rounded-md gap-3 relative `}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className={`${login ? "absolute inset-0 z-0 bg-violet-400 text-black shadow-xl rounded-md" : "absolute inset-0 z-0 bg-slate-700 shadow-xl rounded-md"}`}
          ></motion.span>
        )}
      </p>
    );
  }
  
  Chip.propTypes = {
    login: PropTypes.bool,
    setShow: PropTypes.func,
    text: PropTypes.string,
    selected: PropTypes.bool,
    setSelected: PropTypes.func,
  };