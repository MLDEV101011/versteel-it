import logo from "../assets/logo.gif";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword, auth } from "../firebase";
import { useAuthState} from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) Navigate("/home");
  }, [loading, user]);

  // handle login with email and password
  const loginAdminWithEmailAndPassword = async () => {
    try {
      if (checkForNulls()) {
        await loginWithEmailAndPassword(email, password);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // check for nulls
  const checkForNulls = () => {
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return false;
    }
    return true;
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="w-1/3 h-1/2 rounded-2xl bg-white flex flex-col">
        <div className="w-full justify-center flex mt-4">
          <img src={logo} className="w-1/4 h-auto" alt="logo" />
        </div>
        <div className="w-full flex justify-center mt-10">
          <p className="text-4xl text-gray-700">Login</p>
        </div>
        <div className="w-3/4 flex mt-5 flex-col self-center">
          <p className="text-gray-700 text-xl mt-2">Email</p>
          <input
            type="text"
            className="w-full h-10 rounded-lg border-2 border-gray-700 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-gray-700 text-xl mt-2">Password</p>
          <input
            type="password"
            className="w-full h-10 rounded-lg border-2 border-gray-700 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-end mt-5">
            <button
              className="w-1/3 h-10 rounded-lg bg-gray-700 text-white"
              onClick={loginAdminWithEmailAndPassword}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
