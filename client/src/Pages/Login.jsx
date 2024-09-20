import { useState } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigator = useNavigate();

  const [user,setUser] = useState({
    username:"",
    password:"",
  })

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  
  const handleLogin = async () => {


    if (user.username === "" || user.password === "") {
      return;
    }
  
    try {
      const response = await axios.post('http:localhost:5000/login', { username : user.username , password : user.password });
      console.log(response.data);
      localStorage.setItem("token" ,  response.data.token)
      navigator("/codebattle")
    } catch (error) {
      alert("something went wrong")
      console.log(user)
      console.log("error ",error);
    }
  }
  

  return (
    <div className="h-screen w-screen">

      <form action="POST" className="flex h-screen flex-col justify-center items-center">
          <input type="text" name="username" id="username" value={user.username} onChange={handleChange} placeholder="username"/>
          <br />
          <input type="password" name="password" id="password" value={user.password} onChange={handleChange} placeholder="password" />
          <br />

          <p className="text-white">Dont have account ? <Link to={"/signup"}>sign up here</Link></p>

          <p className="text-white bg-slate-800 p-3" onClick={handleLogin}>login</p>
          
      </form>

    </div>
  )
}
