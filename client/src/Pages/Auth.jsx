import { useEffect, useState } from "react";
import Chip from "../components/Chip";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Auth() {

  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [recruter, setRecruter] = useState(false);
  const [recLog, setRecLog] = useState(false);
  const [cred, setCred] = useState(false);
  const [loginError,setLoginError] = useState("Something went wrong!! Try again later :)")

  useEffect(() => {
    const recruter = sessionStorage.getItem("Recruter") ? sessionStorage.getItem("Recruter") : null;
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
    setLoading(true)
    if (!recLog) {
      if (user.username === "" || user.password === "") {
        console.log("sorry");
        document.getElementById("errMsg").style.display = "block";
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username: user.username,
        password: user.password,
      },{ withCredentials: true });
      const userJson = JSON.stringify(response.data.user);
      localStorage.setItem("userInfo", userJson);
      setLoading(false)
      toast.success('Login successfully :)',{ style: { background : "#1e293b" , color : "white" },})
      navigator("/");
      console.log("res",response)
    } catch (error) {
      document.getElementById("loginErrMsg").style.display="block";
      let err = error.response ? error.response.data.error : error.message;
      toast.error(`${err}`,{ style: { background : "#1e293b" , color : "white" },})
      console.log(err)
      setLoginError(err)
      console.error("Error during registration:", err);
    }
    setLoading(false)
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
  

  const handleSubmit = async () => {
    
    setLoading(true)
    
    if (userRegister.username === userRegister.email) {
      setLoading(false)
      document.getElementById("errMsg").style.display="block";
      setLoginError("Username and email can't be same :)")
      toast.error("Username and email can't be same",{ style: { background : "#1e293b" , color : "white" },})
      return;
    }
    
    if (
      userRegister.email === "" ||
      userRegister.password === "" ||
      userRegister.name === "" ||
      userRegister.confirm_password === ""
    ) {
      setLoading(false)
      document.getElementById("errMsg").style.display="block";
      setLoginError("Email and password are required :)")
      toast.error('All filled are required :)',{ style: { background : "#1e293b" , color : "white" },})
      return;
    }
    
    if (userRegister.password !== userRegister.confirm_password) {
      console.log("Password does not match");
      setLoading(false)
      document.getElementById("errMsg").style.display="block";
      setLoginError("Password does not match :)")
      toast.error('Password does not match :)',{ style: { background : "#1e293b" , color : "white" },})
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username: userRegister.username,
        email: userRegister.email,
        name: userRegister.name,
        password: userRegister.password,
        about : "" ,
        DP : ""
      },{ withCredentials: true });
      console.log(response.data);
      const userJson = JSON.stringify(response.data.user);
      localStorage.setItem("userInfo", userJson);
      setLoading(false)
      toast.success('Registeration done successfully :)',{ style: { background : "#1e293b" , color : "white" },})
      navigator("/");
    } catch (error) {
      document.getElementById("errMsg").style.display="block";
      let err = error.response ? error.response.data.error : error.message;
      toast.error(`${err}`,{ style: { background : "#1e293b" , color : "white" },})
      console.log(err)
      setLoginError(err)
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    }
    setLoading(false)
  };
  

  const handleOkay = () => {
    setRecruter(false);
    setCred(true);
    handleLogin()
  };

  return (
    <div>
      {recruter ? (
        <div className="backdrop-blur-sm h-screen w-screen flex justify-center items-center absolute top-0 z-[100]">
          <div className="h-[40vh] flex border-2 border-violet-600 flex-col justify-center items-center text-white px-2 py-1 w-[30vw] bg-[#1e293b] shadow-2xl rounded-lg z-[110]">
           <p className="text-violet-600 text-xl font-extrabold">RECRUTER&apos;S TIP</p>
           <p className="w-[80%] mt-1 mb-2 text-center">You are a recruiter, and I am providing you with your credentials for your convenience.</p>
          <div className="flex justify-center items-center">
          <span className="flex justify-center items-center gap-1 m-1">Username : <p className="bg-[#64748b] p-1 text-sm text-center rounded-md">RecID</p> </span>
          <span className="flex justify-center items-center gap-1 m-1">Password : <p className="bg-[#64748b] p-1 text-sm text-center rounded-md">RecPass</p> </span>
          </div>
           <button className="bg-violet-600 w-[60%] mt-4 p-2 rounded-full hover:bg-violet-400 hover:scale-[1.05] transition-all ease-in-out duration-150 hover:shadow-xl" onClick={handleOkay}>Okay got it!!</button>
          </div>
        </div>
      ) : null}

      { !localStorage.getItem("userDetail") ? (
       <div className="flex justify-center items-center overflow-hidden">
       <div className="absolute z-10 top-2 rounded-xl bg-slate-800 p-2 lg:p-3 text-black flex justify-center items-center w-[45vw] md:w-[25vw] lg:w-[18vw] gap-2">
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
           className="hidden md:relative h-screen select-none bg-violet-400 bg-gradient-to-br md:w-1/2"
         >
           <div className="hidden md:block py-16 px-8 text-white xl:w-[40rem]">
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
             <Link
to={"/"}               className="font-semibold tracking-wide text-black underline underline-offset-4 text-lg"
             >
               CODEBATTLE
             </Link>
           </div>

           <div className="hidden md:flex justify-center items-center">
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
                   to="/"
                   className="underline cursor-pointer z-50 text-violet-400"
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

                 {/* <p
                   className="mb-6 text-sm font-medium text-violet-200 md:text-left text-center"
                 >
                   Forgot password ?
                 </p> */}

                 <p id="loginErrMsg" className="hidden text-sm mb-2 text-red-600">
                  {loginError}
                 </p>

                
                 {loading ? (
                <div
                  role="status"
                  className="bg-[#1e293b] mt-5 flex justify-center items-center cursor-not-allowed w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600"
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
              ) : (
                <button
                   className="bg-[#b5a3fc] mt-5 w-full px-3 py-2 rounded-md text-black cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05] font-bold text-lg"
                   onClick={handleLogin}
                 >
                   Login
                 </button>
              )}

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
               <div className="text-center text-3xl font-bold md:leading-tight md:text-left w-full lg:w-[30vw] md:text-5xl">
                 Create an account <br />{" "}
                 <Link
                   to="/"
                   className="underline cursor-pointer z-50 text-violet-400"
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

                 <p id="errMsg" className="text-sm my-1 text-center font-bold text-red-600 hidden">
                  {loginError}
                 </p>

                 {loading ? (
                <div
                  role="status"
                  className="bg-[#1e293b] mt-5 flex justify-center items-center cursor-not-allowed w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600"
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
              ) : (
                <button
                className="bg-[#b5a3fc] w-full px-3 py-2 rounded-md text-black cursor-pointer transition-all ease-linear duration-75 hover:scale-[1.05] font-bold text-lg"
                onClick={handleSubmit}
              >
                Sign up
              </button>
              )}

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