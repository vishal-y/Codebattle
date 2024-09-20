import { useEffect, useState } from "react";
import Chip from "../components/Chip";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {

  const navigator = useNavigate();

  const [recruter, setRecruter] = useState(false);
  const [recLog, setRecLog] = useState(false);
  const [cred, setCred] = useState(false);

  useEffect(() => {
    const recruter = sessionStorage.getItem("Recruter");
    if (recruter) {
      setRecruter(true);
      setRecLog(true);
      setUser({ username: "RecID", password: "RecPass" });
    } else {
      setRecruter(false);
      setRecLog(false);
    }
  }, []);

  const [show, setShow] = useState(true);

  const tabs = ["SIGN IN", "SIGN UP"];
  const [selected, setSelected] = useState(tabs[0]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!recLog) {
      if (user.username === "" || user.password === "") {
        console.log("sorry");
        document.getElementById("errMsg").style.display = "block";
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: user.username,
        password: user.password,
      });
      const userJson = JSON.stringify(response.data.user);
      localStorage.setItem("userInfo", userJson);
      localStorage.setItem("token", response.data.token);
      navigator("/codebattle");
    } catch (error) {
      console.log(user);
      console.log("error ", error);
    }
  };

  const [userRegister, setUserRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInput = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRegister.username === userRegister.email) {
      console.log("Username and email can't be the same");
      return;
    }

    if (
      userRegister.email === "" ||
      userRegister.password === "" ||
      userRegister.name === "" ||
      userRegister.confirm_password === ""
    ) {
      console.log("Email and password are required");
      return;
    }

    if (userRegister.password !== userRegister.confirm_password) {
      console.log("Password does not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: userRegister.username,
        email: userRegister.email,
        name: userRegister.name,
        password: userRegister.password,
        about : "" ,
        DP : ""
      });
      console.log(response.data);
      const userJson = JSON.stringify(response.data.user);
      localStorage.setItem("userInfo", userJson);
      localStorage.setItem("token", response.data.token);
      navigator("/codebattle");
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    }
  };
  

  const handleOkay = () => {
    setRecruter(false);
    setCred(true);
  };

  return (
    <div>
      {recruter ? (
        <div className="backdrop-blur-sm h-screen w-screen flex justify-center items-center absolute top-0 z-[100]">
          <div className="h-[40vh] w-[30vw] bg-[#baa3fe] shadow-2xl rounded-lg z-[110]">
            <button onClick={handleOkay}>okay!</button>
          </div>
        </div>
      ) : null}

      { !localStorage.getItem("token") ? (
       <div className="flex justify-center items-center overflow-hidden">
       <div className="absolute z-10 top-2 rounded-xl bg-slate-800 p-3 text-black flex justify-center items-center w-[35vw] md:w-[25vw] lg:w-[14vw] gap-2">
         {tabs.map((tab) => (
           <Chip
             login={true}
             show={show}
             setShow={setShow}
             text={tab}
             selected={selected === tab}
             setSelected={setSelected}
             key={tab}
           />
         ))}
       </div>

       <div
         className={
           "flex justify-center items-center md:justify-normal w-screen flex-wrap text-white"
         }
       >
         <motion.div
           animate={{ left: show ? "0%" : "50%" }}
           transition={{ type: "spring", duration: 0.5 }}
           className="hidden lg:relative h-screen select-none bg-violet-400 bg-gradient-to-br md:w-1/2"
         >
           <div className="py-16 px-8 text-white xl:w-[40rem]">
             {/* <span className="rounded-full bg-[#100821] px-3 py-1 font-medium text-violet-400">CODEBATTLE</span> */}
             <p className="my-6 text-3xl font-semibold leading-10 text-black">
               Lets learn with{" "}
               <span className="bg-[#100821] rounded-md p-2 whitespace-nowrap py-2 text-violet-400">
                 fun and friends
               </span>{" "}
               .
             </p>
             <p className="mb-4 text-black text-lg">
               Codebattle is a free site where developers can work on coding and algorithms problems together with others.
             </p>
             <a
               href="#"
               className="font-semibold tracking-wide text-black underline underline-offset-4 text-lg"
             >
               Learn More
             </a>
           </div>

           <div className="flex justify-center items-center">
             <img
               className="rounded-xl object-cover w-[90%]"
               src="/editorPage.png"
             />
           </div>
         </motion.div>

         <motion.div
           animate={{
             left: show ? "0%" : window.screen.width > 500 ? "-50%" : "0%",
           }}
           transition={{ type: "spring", duration: 0.5 }}
           className="relative flex w-full flex-col md:w-1/2"
         >
           <div className="flex justify-center pt-12 md:justify-start md:pl-12"></div>

           {show ? (
             <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
               <div className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
                 Welcome back to <br />{" "}
                 <Link
                   to="/codebattle"
                   className="cursor-pointer z-50 text-violet-400"
                 >
                   CODEBATTLE.
                 </Link>
               </div>
                {/* <p className="mt-6 text-center font-medium md:text-left text-lg">
                  Sign in to your account below.
                </p> */}

               <div className="flex flex-col items-stretch pt-3 md:pt-8">
                 <div className="flex flex-col pt-4">
                   <input
                     type="text"
                     id="username"
                     name="username"
                     value={cred ? "RecID" : user.username}
                     onChange={handleChangeLogin}
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Username"
                   />
                 </div>
                 <div className="mb-4 flex flex-col pt-4">
                   <input
                     type="password"
                     id="login-password"
                     name="password"
                     value={cred ? "RecPass" : user.password}
                     onChange={handleChangeLogin}
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Password"
                   />
                 </div>

                 <p
                   className="mb-6 text-sm font-medium text-violet-200 md:text-left text-center"
                 >
                   Forgot password ?
                 </p>

                 <p id="errMsg" className="text-sm font-bold text-red-600 hidden">Something went wrong !! Try again :)</p>

                 <button
                   className="bg-[#b5a3fc] w-full px-3 py-2 rounded-md text-black cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05] font-bold text-lg"
                   onClick={handleLogin}
                 >
                   Login
                 </button>
               </div>
               <div className="py-12 text-center">
                 <div className="text-violet-200">
                   Don&apos;t have an account ?
                   <p
                     onClick={() => {
                       setShow(false);
                       setSelected('SIGN UP')
                     }}
                     className="whitespace-nowrap font-semibold text-violet-400 ml-2 underline underline-offset-2 cursor-pointer"
                   >
                     Sign Up
                   </p>
                 </div>
               </div>
             </div>
           ) : (
             <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
               <div className="text-center text-3xl font-bold md:leading-tight md:text-left w-[30vw] md:text-5xl">
                 Create an account <br />{" "}
                 <Link
                   to="/codebattle"
                   className="cursor-pointer z-50 text-violet-400"
                 >
                   CODEBATTLE.
                 </Link>
               </div>
               {/* <p className="mt-6 text-center font-medium md:text-left text-lg">
                 Sign up for an account below.
               </p> */}

               <div className="flex flex-col items-stretch pt-3 md:pt-8">
                 <div className="flex justify-center items-center gap-4 pt-4">
                   <input
                     value={userRegister.name}
                     onChange={handleInput}
                     type="text"
                     name="name"
                     id="register_name"
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Name"
                   />
                   <input
                     value={userRegister.username}
                     onChange={handleInput}
                     type="text"
                     name="username"
                     id="register_username"
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Username"
                   />
                 </div>
                 <div className="flex flex-col pt-4">
                   <input
                     value={userRegister.email}
                     onChange={handleInput}
                     type="email"
                     name="email"
                     id="register_email"
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Email"
                   />
                 </div>
                 <div className="flex flex-col pt-4">
                   <input
                     value={userRegister.password}
                     onChange={handleInput}
                     type="password"
                     name="password"
                     id="register_password"
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Password"
                   />
                 </div>
                 <div className="mb-4 flex flex-col pt-4">
                   <input
                     value={userRegister.confirm_password}
                     onChange={handleInput}
                     type="password"
                     name="confirm_password"
                     id="register_password_confirm"
                     className="w-full flex-shrink appearance-none bg-transparent p-3 outline-none border border-[#b5a3fc] rounded-md"
                     placeholder="Confirm Password"
                   />
                 </div>

                 <p id="errMsg" className="text-sm font-bold text-red-600 hidden">Something went wrong !! Try again :)</p>

                 <button
                   className="bg-[#b5a3fc] w-full px-3 py-2 rounded-md text-black cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05] font-bold text-lg"
                   onClick={handleSubmit}
                 >
                   Sign up
                 </button>
               </div>
               <div className="py-12 text-center">
                 <div className="text-violet-200">
                   Already have an account ?
                   <p
                     onClick={() => {
                       setShow(true);
                       setSelected('SIGN IN')
                     }}
                     className="whitespace-nowrap font-semibold text-violet-400 ml-2 underline underline-offset-2 cursor-pointer"
                   >
                     Sign In
                   </p>
                 </div>
               </div>
             </div>
           )}
         </motion.div>
       </div>
     </div>
      ) : (
       window.location.href="/"
      )}
    </div>
  );
}

