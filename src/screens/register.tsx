import "../index.css";
import applogo from "../assets/app-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createAccount from "../backend/create-account";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const success = await createAccount(name, lastName, email, password);
    if (success) {
      navigate("/home");
    } else {
      setErrorMessage("Couldn't create account, try again.");
    }
  };

  // @ts-ignore
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confPassword.trim() !== "" &&
      password === confPassword
    );
  };

  return (
    <div className="font-comfortaa w-screen min-h-screen p-5 flex flex-col items-center justify-center bg-slate-900">
      <img src={applogo} className="w-20 h-20 mb-8" alt="App Logo" />
      <h1 translate="no" className="text-cyan-400 text-3xl font-semibold mb-8">
        Express Task+
      </h1>

      <div className="flex flex-col w-80">
        <label className="text-sm text-gray-300 mb-2">Name</label>
        <input
          type="name"
          id="name"
          placeholder=""
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-80 mt-6">
        <label className="text-sm text-gray-300 mb-2">Last name</label>
        <input
          type="lastname"
          id="lastName"
          placeholder=""
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-80 mt-6">
        <label htmlFor="email" className="text-sm text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email@example.com"
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-80 mt-6 relative">
        <label htmlFor="password" className="text-sm text-gray-300 mb-2">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="********"
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="p-3 text-gray-300 hover:text-white transition duration-150"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <div className="flex flex-col w-80 mt-6 relative">
        <label
          htmlFor="password-confirm"
          className="text-sm text-gray-300 mb-2"
        >
          Confirm Password
        </label>
        <input
          type={showConfPassword ? "text" : "password"}
          id="password-confirm"
          placeholder="********"
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="p-3 text-gray-300 hover:text-white transition duration-150"
          onClick={() => setShowConfPassword((prev) => !prev)}
        >
          {showConfPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <button
        onClick={handleRegister}
        className={`w-80 text-white mt-8 p-3 rounded-lg transition duration-150 ${
          isFormValid() ? "bg-cyan-500 hover:bg-cyan-600" : "bg-gray-400"
        }`}
        disabled={!isFormValid()}
      >
        Create account
      </button>

      {errorMessage && (
        <div className="mt-4 p-4 bg-transparent text-white rounded-lg w-80 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
