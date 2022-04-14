import { Alert } from "@mui/material";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import {auth, registerWithEmailAndPassword} from '../firebase';
import React, { useEffect } from "react";
import logo from "../assets/logo.gif";

function RegisterPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // confirm password matching
  const confirmPassMatch = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      Alert("Passwords do not match");
      clearPassFields();
      return false;
    }
  };

  // clear password fields
  const clearPassFields = () => {
    setPassword("");
    setConfirmPassword("");
  };

  // check for nulls
  const checkForNulls = () => {
    if (firstName === "" || lastName === "" || email === "" || password === "") {
      Alert("Please fill out all fields");
      return false;
    }
    return true;
  };

  // handle register with email and password
  const registerAdminWithEmailAndPassword = async () => {
    try {
      if (checkForNulls() && confirmPassMatch()) {
        await registerWithEmailAndPassword(email, password, firstName, lastName);
      }
    } catch (err) {
      console.error(err);
      Alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/home");
  }, [loading, user]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="w-1/3 h-3/4 rounded-2xl bg-white flex flex-col">
        <div className="w-full justify-center flex mt-4">
          <img src={logo} className="w-1/4 h-auto" alt="logo" />
        </div>
        <div className="w-full flex justify-center mt-10">
          <p className="text-4xl text-gray-700">Register New Admin</p>
        </div>
        <div className="w-3/4 flex mt-5 flex-col self-center">
          <p className="text-gray-700 text-xl">First Name</p>
          <input
            type="text"
            className="w-full h-10 rounded-lg border-2 border-gray-700 px-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p className="text-gray-700 text-xl mt-2">Last Name</p>
          <input
            type="text"
            className="w-full h-10 rounded-lg border-2 border-gray-700 px-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <p className="text-gray-700 text-xl mt-2">Confirm Password</p>
          <input
            type="password"
            className="w-full h-10 rounded-lg border-2 border-gray-700 px-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="w-full flex justify-end mt-5">
            <button className="w-1/3 h-10 rounded-lg bg-gray-700 text-white" onClick={registerAdminWithEmailAndPassword}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
