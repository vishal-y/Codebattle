import { TiDeleteOutline } from "react-icons/ti";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { mainDP } from "../App";
import toast from "react-hot-toast";

export default function Profile({ setShowProfile }) {
  const [proDP, setProDP] = useAtom(mainDP);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    about: "",
    DP: "",
  });
  const [file, setFile] = useState(null);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("userDetail");
    if (data) {
      const userData = JSON.parse(data);
      setUser({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        about: userData.about,
        DP: userData.DP,
      });
      setProDP(userData.DP); // Update profile picture state
    }
  }, [setProDP]);

  const handleInputChange = (e) => {
    setChange(true);
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setChange(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!change) return;

    setLoading(true);
    let url = user.DP; // Default to existing DP in case no new file is uploaded

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "g4d00wb0");
      data.append("cloud_name", "dmrvveqyb");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dmrvveqyb/image/upload", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const uploadImage = await res.json();
        url = uploadImage.url; // Set the new image URL
        setProDP(url); // Update the profile picture state
        setUser((prevUser) => ({ ...prevUser, DP: url })); // Update user DP
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image.");
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post("http://localhost:5000/user/updateUser", {
        username: user.username,
        name: user.name,
        email: user.email,
        about: user.about,
        DP: url,
      });
      toast.success('Profile updated successfully!', {
        style: { background: "#1e293b", color: "white" },
      });
    } catch (error) {
      toast.error('Something went wrong, try again!', {
        style: { background: "#1e293b", color: "white" },
      });
      console.error("Error updating user:", error);
      setProDP(null);
    }

    setLoading(false);
    setShowProfile(false);
  };

  const handleClose = () => {
    if (change) {
      const isSure = window.confirm("Are you sure? You haven't saved your changes.");
      if (isSure) {
        setChange(false);
        setShowProfile(false);
      }
      document.body.style.overflow = "scroll";
    } else {
      setShowProfile(false);
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <div className="absolute top-0 h-screen w-screen bg-black/[.30] flex justify-center items-center">
      <div className="h-fit w-[90vw] lg:w-[30%] lg:min-w-[40vw] border-2 border-violet-300 min-w-[60vw] shadow-2xl rounded-lg z-50 bg-slate-800 text-white">
        <div className="flex justify-between items-center p-4">
          <h2 className="font-bold text-xl">Edit details</h2>
          <TiDeleteOutline
            onClick={handleClose}
            size={25}
            className="cursor-pointer hover:bg-violet-300 rounded-full hover:text-black"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="py-4 flex justify-evenly items-center">
            <div className="w-[36%] rounded-sm flex justify-center items-center">
              {proDP ? (
                <div className="h-[16.6rem] w-[14rem] flex justify-center items-center flex-col">
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <svg aria-hidden="true" className="w-10 h-10 absolute text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <img src={proDP} className="rounded-lg transition-all duration-200 shadow-2xl h-[90%] w-[100%] object-cover border-[1.5px] border-dotted border-[#b5a3fc] p-[0.10rem]" />
                    </div>
                  ) : (
                    <img src={proDP} className="rounded-lg hover:scale-[1.06] transition-all duration-200 shadow-2xl h-[90%] w-[100%] object-cover border-[1.5px] border-dotted border-[#b5a3fc] p-[0.10rem]" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-[14.5rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>

                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        <br /> <span className="text-center">or</span> drag and drop
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="w-[53%] h-full flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center gap-2">
                <input
                  type="text"
                  value={user.name}
                  name="name"
                  id="profile_name"
                  className="py-2 bg-transparent border border-dashed border-[#685a96] rounded-sm w-full p-2 outline-none"
                  placeholder="Name"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  value={user.username}
                  name="username"
                  id="profile_username"
                  className="py-2 bg-transparent cursor-not-allowed border border-[#685a96] text-gray-400 rounded-sm w-full p-2 outline-none"
                  placeholder="Username"
                  readOnly
                  disabled
                />
              </div>

              <input
                type="text"
                value={user.email}
                name="email"
                id="profile_email"
                className="py-2 bg-transparent border border-dashed border-[#685a96] rounded-sm w-full p-2 outline-none"
                placeholder="Email"
                onChange={handleInputChange}
              />

              <textarea
                name="about"
                id="about"
                rows="2"
                value={user.about}
                className="w-full bg-transparent border border-dashed border-[#685a96] rounded-sm resize-none p-2 outline-none"
                placeholder="Write something about you :)"
                onChange={handleInputChange}
              ></textarea>

              {loading ? (
                <div
                  role="status"
                  className="bg-[#b5a3fc] flex justify-center items-center cursor-not-allowed w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 hover:scale-[1.05]"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  type="submit"
                  className={`bg-[#b5a3fc] w-full py-2 rounded-md text-black text-base transition-all ease-linear duration-75 hover:scale-[1.05] ${!change ? "cursor-not-allowed" : "cursor-pointer"}`}
                  disabled={!change} // Disable button if no changes
                >
                  Save changes
                </button>
              )}
            </div>
          </div>
          <div className="h-[7vh] min-h-[7vh]"></div>
        </form>
      </div>
    </div>
  );
}

Profile.propTypes = {
  setShowProfile: PropTypes.func.isRequired,
};
