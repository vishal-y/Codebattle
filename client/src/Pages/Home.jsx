import HomeEditor from "../components/HomeEditor";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
// import Bento from "../components/Bento";
import RoomForm from '../components/RoomForm'

export default function Home() {

  const location = useLocation();
  const [roomForm,setRoomForm] = useState(false)

  useEffect(()=>{

    if(document.getElementById("navbar")){
      document.getElementById("navbar").style.display = "block"
    }

    const queryParams = new URLSearchParams(location.search);
    const recruter = queryParams.get('recruter') === 'true';
    recruter ? sessionStorage.setItem("Recruter" , true) : null
  },[])


  return (
    <main className="bg-[#100821]">
      {/* hero */}

      <div id="HOME" className="flex flex-col items-center justify-center">
        
      {roomForm ? <RoomForm setRoomForm={setRoomForm}/> : null}
       
      {/* <div className="flex justify-between z-10 w-[90vw] lg:w-[75vw] items-center">
        <img src="/logo.png" alt="logo" className="lg:h-28 lg:w-32 h-24 w-28"/>
        <div className="text-slate-300 hidden  text-sm  lg:flex justify-center items-center ">
            <p className="bg-[#27272a]  w-fit px-4 py-1 rounded-xl cursor-pointer hover:scale-[1.05]">
              New updates and more{" "}
            </p>
          </div>
        <div className="flex justify-between gap-5 items-center">
        <p className="dark:text-white bg-black px-2 py-1 rounded-md border dark:border-white border-black text-white text-base w-fit cursor-pointer  transition-all ease-linear duration-75 hover:border-slate-200 hover:scale-[1.05] hover:bg-[#1f1f1f] font-medium">
              Login
            </p>
            <p className="bg-white px-2 py-1 rounded-md text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-75 hover:bg-slate-200 hover:scale-[1.05]">
              Sign up
            </p>
        </div>
      </div> */}
       
        <div className="relative items-center w-full px-5 mx-auto max-w-7xl lg:pt-36 lg:px-16 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
          <h1 className="bg-[#b5a3fc] inline-block text-transparent bg-clip-text tracking-tight text-5xl md:text-7xl GB ">CodeBattle  <br /> Collaborative Platform
          </h1>
          {/* <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text tracking-tight text-5xl md:text-7xl GB ">CodeBattle  <br /> Collaborative Platform
          </h1> */}
            
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-violet-200">
             
              Codebattle is a free site where developers can work on coding and algorithms problems together with others.

            </p>
          </div>


          <div className="flex justify-center items-center gap-3 mt-10 sm:flex-row">
            <button onClick={()=>{setRoomForm(true)}} className="hover:bg-[#b5a3fc] border border-[#b5a3fc] bg-transparent text-white px-3 py-2 rounded-md hover:text-black text-base w-fit cursor-pointer  transition-all ease-linear duration-150 hover:scale-[1.05]"> Create or join room</button>
          </div>


        </div>
        <div className="relative items-center w-full py-12 pb-12 mx-auto mt-12 h-screen max-w-7xl">
          <img
            alt=""
            className="relative  object-cover w-full border-4 shadow-2xl shadow-slate-900 border-[#b5a3fc] hover:scale-[1.01] transition-all duration-200 rounded lg:rounded-2xl"
            src="/editorPage.png"
          />
        </div>
      </div>

      {/* about */}

      <div id="ABOUT" className="justify-center w-full mx-auto ">
      
        <section>
          <div className="h-full px-8 pb-24 pt-8 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tighter text-white">
                Experience the true power
                <span className="lg:block">of spotless for Tailwind CSS</span>
              </h2>
              <p className="max-w-lg mx-auto mt-4 text-base text-gray-400">
                All these features are right at your fingertips within the
                browser. And this is just the start, more features are added in
                every update!
              </p>
            </div>
            <div className="grid grid-cols-2 mt-12 text-center gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Live editing</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Instantly see the result of every change you make.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Autocompletion</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    spotless will suggest the right classes for you as you type.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Hide/show classes</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Hide or show classes to see how your design changes.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Color preview</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    See the color of every class in the autocompletion view.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Easy navigation</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Hover over any element to see its Tailwind classes. Press
                    Space to easily pin and edit the element.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Persistence</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    spotless will remember all your changes to every element so
                    you can copy all changes at once!
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Screenshot tool</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Make screenshots of a particular part of the screen to share
                    quick and easy!
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 mx-auto rounded-full border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-white">Breakpoint info</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Instantly know what Tailwind breakpoint currently on.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="scroll-mt-24" id="features">
          <div className="flex flex-col h-full gap-2 px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
       
            <div className="hidden gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
              <div className="max-w-lg  p-2 rounded-3xl min-w-full mx-auto">
                <div className="flex mt-[-.5rem] h-[17rem]">
                  <div className="flex flex-col justify-center p-8 border border-[#685a96]  rounded-3xl max-w-none">
                    <h2 className="font-medium text-[#b5a3fc] text-center">
                      No additional restrictions
                    </h2>
                    <p className="mt-4 text-sm text-center text-violet-200">
                      You may not impose any additional legal terms or
                      technological measures on the work that restrict the
                      freedoms granted by the CC BY 3.0 License. This means you
                      add extra conditions or restrictions beyond what the
                      license allows.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div>
                  <div className="relative h-full p-2 overflow-hidden box-inset border border-[#685a96] rounded-3xl">
                
                    <HomeEditor h={16} code={`void tokenize(string s, string del = " ")
  {
      int start = 0 , end = s.find(del);
      while (end != -1) {
          cout << s.substr(start, end - start) << endl;
          start = end + del.size();
          end = s.find(del, start);
      }
      cout << s.substr(start, end - start);
  }`}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden py-2 gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
              <div className="max-w-lg p-2 border rounded-3xl border-[#685a96]  min-w-full mx-auto lg:col-start-3">
                <div className="flex h-full">
                  <div className="flex flex-col justify-center p-8  max-w-none">
                    <h2 className="font-medium text-[#b5a3fc] text-center">
                      Rule of Attribution
                    </h2>
                    <p className="mt-4 te text-centerxt-sm text-violet-200">
                      You must give appropriate credit to the original creator
                      of the work. This typically includes providing the name of
                      the author or licensor, a link to the original work, and
                      indicating if changes were made.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-start-1 lg:col-span-2">
                <div>
                  <div className="relative h-full p-2 overflow-hidden box-inset border border-[#685a96]  rounded-3xl">
                  <HomeEditor h={18} code={`bool isValidSerialization(string preorder) {
    stringstream ss(preorder);
    string curr;
    int nodes = 1;
    while (getline(ss, curr, ',')) {
      nodes--;
      if (nodes < 0) return false;
      if (curr != "#") nodes += 2;
    }
    return nodes == 0;
}`}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:hidden gap-2 mt-2 text-center md:grid-cols-3">
              <div>
                <div className="p-2 overflow-hidden border border-[#1f1f1f] rounded-3xl">
                  <img
                    src="https://zeabur.com/images/screenshot.png"
                    alt="Guidelines and computed regions"
                    className="w-full h-full mx-auto rounded-2xl"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-medium text-white">
                    No warranty disclaimer
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    The license comes with no warranties. The licensor provides
                    the work and users must use it at their own risk.
                  </p>
                </div>
              </div>
              <div>
                <div className="p-2 overflow-hidden border border-[#1f1f1f] rounded-3xl">
                  <img
                    src="https://zeabur.com/images/screenshot.png"
                    alt="Copy element or class list"
                    className="w-full h-full mx-auto rounded-2xl"
                  />
                </div>
                <div className="px-8 mt-4">
                  <p className="font-medium text-white">Modification Freedom</p>
                  <p className="mt-2 text-sm text-gray-400">
                    You can adapt, remix, transform, and build upon the licensed
                    work.
                  </p>
                </div>
              </div>
              <div>
                <div className="p-2 overflow-hidden border border-[#1f1f1f] rounded-3xl">
                  <img
                    src="https://zeabur.com/images/screenshot.png"
                    alt="Autocompletion"
                    className="w-full h-full mx-auto rounded-2xl"
                  />
                </div>
                <div className="px-8 mt-4">
                  <p className="font-medium text-white">
                    Commercial use allowed
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    You are allowed to use the licensed work for both
                    non-commercial and commercial purposes.
                  </p>
                </div>
              </div>

             <div className="w-[90vw] pr-[1.2rem] mt-[6rem] overflow-hidden flex justify-center items-center">
             <HomeEditor code={`bool isValidSerialization(string preorder) {                                
    stringstream ss(preorder);                                              
    string curr;                                                            
    int nodes = 1;                                                          
    while (getline(ss, curr, ',')) {                                        
      nodes--;                                                              
      if (nodes < 0) return false;                                          
      if (curr != "#") nodes += 2;                                          
    }                                                                       
    return nodes == 0;                                                     
}                                                                           `}/>                                                                      
             </div>

            </div>
            
          </div>
        </section>

        <section>
          <div className="px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
            <div>
              <p className="mt-12 text-4xl font-semibold tracking-tighter text-[#b4a2fc] ">
                Our super users ( Programmers )
                <span className="text-[#b4a2fc] md:block">
                  love us and our idea and platform
                </span>
              </p>
            </div>
            <ul
              role="list"
              className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-12 sm:gap-4 lg:max-w-none lg:grid-cols-3"
            >
              <li className="p-2 ">
                <figure className="relative flex flex-col justify-between h-full p-6  border border-[#baa8d8] shadow-lg rounded-2xl">
                  <blockquote className="relative">
                    <p className="text-base text-violet-200">
                      Being in the financial industry, we were always looking
                      for ways to enhance our security and efficiency.
                    </p>
                  </blockquote>
                  <figcaption className="relative flex items-center justify-between pt-6 mt-6">
                    <div>
                      <div className="font-medium text-gray-300">
                        Annur Flint
                      </div>
                      <div className="mt-1 text-sm text-gray-300">
                        CEO at Flint LLC
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <img
                        alt=""
                        className="h-12 w-12"
                        src="https://windstatic.com/images/appify/avatar1.png"
                      />
                    </div>
                  </figcaption>
                </figure>
              </li>
              <li className="p-2 ">
                <figure className="relative flex flex-col justify-between h-full p-6  border border-[#baa8d8] shadow-lg rounded-2xl">
                  <blockquote className="relative">
                    <p className="text-base text-violet-200">
                      Implementing Sempl blockchain technology has been a
                      game-changer for our supply chain management.
                    </p>
                  </blockquote>
                  <figcaption className="relative flex items-center justify-between pt-6 mt-6">
                    <div>
                      <div className="font-medium text-gray-300">
                        Jordan Pettersson
                      </div>
                      <div className="mt-1 text-sm text-gray-300">
                        Director at P Industries
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <img
                        alt=""
                        className="h-12 w-12"
                        src="https://windstatic.com/images/appify/avatar1.png"
                      />
                    </div>
                  </figcaption>
                </figure>
              </li>
              <li className="p-2">
                <figure className="relative flex flex-col justify-between h-full p-6  border border-[#baa8d8] shadow-lg rounded-2xl">
                  <blockquote className="relative">
                    <p className="text-base text-violet-200">
                      We were initially hesitant about integrating blockchain
                      technology into our existing systems, fearing the
                      complexity of the process.
                    </p>
                  </blockquote>
                  <figcaption className="relative flex items-center justify-between pt-6 mt-6">
                    <div>
                      <div className="font-medium text-gray-300">
                        Oliver Benji
                      </div>
                      <div className="mt-1 text-sm text-gray-300">
                        Founder of Benji and Tom
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <img
                        alt=""
                        className="h-12 w-12"
                        src="https://windstatic.com/images/appify/avatar1.png"
                      />
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </div>
        </section>
        {/* <Bento/> */}
      </div>
    </main>
  );
}
