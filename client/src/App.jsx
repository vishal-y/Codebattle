import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainHome from './Homepage/MainHome'
import Editor from "./Pages/Editor";
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";
import { atom } from 'jotai'
import Auth from "./Pages/Auth";
import Test from "./Pages/Test";
import Problems from "./Pages/Problems";
import About from "./Pages/About";
import { getUserData } from "../src/utils/getUserData";

export const allMainCode = atom("");
export const mainDP = atom("");

const fetchData = async (username) => {
  try {
    const data = await getUserData(username);
    const userData = {
      name: data.name,
      username: data.username,
      email: data.email,
      about: data.about,
      DP: data.DP,
    };
    localStorage.setItem("userDetail", JSON.stringify(userData));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const AppContent = () => {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === "/auth" || location.pathname.includes("codebattle");
  const storedUserDetail = localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : false;
  const userDetail = storedUserDetail ? JSON.parse(storedUserDetail) : false;
  const username = userDetail.username;
  if(username && !localStorage.getItem("userDetail")){
    fetchData(username) 
  } 

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/codebattle/:id" element={<Editor />} />
        <Route path="/codebattle/:codebattle/:id" element={<Editor />} />
        <Route path="/invalidID" element={<Problems />} />
        <Route path="/*" element={<Test />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div><Toaster /></div>
      <AppContent />
    </BrowserRouter>
  );
}
