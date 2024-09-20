import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigator = useNavigate();

  const [user, setUser] = useState({
    username : '',
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    if(user.username == user.email){
      console.log("username and email can't be same :< ");
      return ;
    }

    if (user.email === '' || user.password === '') {
      console.log("Email and password are required");
      return;
    }

    // fetch("http://localhost:5000/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(user)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setUser({
    //       username : '',
    //       email : '',
    //       password : ''
    //     })
    //     console.log(data.message); // User registered successfully
    //     navigator("/codebattle")
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    try {
      const response = await axios.post('http:localhost:5000/register', { username : user.username , email : user.email , password : user.password });
      console.log(response.data);
      localStorage.setItem("token" ,  response.data.token)
      navigator("/codebattle")
    } catch (error) {
      console.log(user)
      console.log("error ",error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p className="text-white">Username</p>
        <input
          value={user.username}
          onChange={handleInput}
          type="username"
          name="username"
          id="username"
          autoComplete="true"
        />
        <br />
        <p className="text-white ">Email</p>
        <input
          value={user.email}
          onChange={handleInput}
          type="email"
          name="email"
          id="email"
          autoComplete="true"
        />
        <p className="text-white">Password</p>
        <input
          value={user.password}
          onChange={handleInput}
          type="password"
          name="password"
          autoComplete="current-password"
          id="password"
        />
        <br />

        <p className="bg-[#b5a3fc] px-3 py-1 rounded-md text-black text-base w-fit cursor-pointer transition-all ease-linear duration-75 mt-5 hover:scale-[1.05]" onClick={handleSubmit}>
          Register      
        </p>

      </div>
    </div>
  );
}