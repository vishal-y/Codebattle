import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Problem from "./Pages/Problems";
// import RoomForm from './components/RoomForm'
import Editor from "./Pages/Editor";
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";
import { atom } from 'jotai'
import Auth from "./Pages/Auth";
import Test from "./Pages/Test";
import Problems from "./Pages/Problems";

// Define your atoms
export const allMainCode = atom("");
export const mainDP = atom("");

// Create a component to conditionally render the Navbar
const AppContent = () => {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === "/auth" || location.pathname.includes("codebattle");
  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<Problems />} />
        {/* <Route path="/room" element={<RoomForm />} /> */}
        <Route path="/codebattle2" element={<Problem />} />
        <Route path="/codebattle/:codebattle/:id" element={<Editor />} />
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
