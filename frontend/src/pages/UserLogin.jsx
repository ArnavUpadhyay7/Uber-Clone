import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UsersDataContext } from "../context/UsersContext";

const UserLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UsersDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {email, password};
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        newUser, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (res.status == 200) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen p-6 flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo"
        />
        <form onSubmit={(e) => handleSubmit(e)} action="">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-6 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          {" "}
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="inline-block text-center bg-[#10b461] text-white font-semibold mb-6 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
