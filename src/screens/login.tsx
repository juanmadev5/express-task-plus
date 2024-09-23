import "../index.css";
import applogo from "../assets/app-logo.png";
import { useState } from "react";
import loginHandler from "../backend/login-handler";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const loggedIn = await loginHandler(email, password);
    if (loggedIn) {
      navigate("/home");
    } else {
      setErrorMessage("Email or password incorrect, try again.");
    }
  };
  return (
    <div className="font-comfortaa w-screen min-h-screen p-5 flex flex-col items-center justify-center bg-slate-900">
      <img src={applogo} className="w-20 h-20 mb-8" alt="App Logo" />
      <h1 className="text-cyan-400 text-3xl font-semibold mb-8">
        Login to Express Task+
      </h1>

      <div className="flex flex-col w-80">
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

      <div className="flex flex-col w-80 mt-6">
        <label htmlFor="password" className="text-sm text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="********"
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-80 bg-cyan-500 text-white mt-8 p-3 rounded-lg hover:bg-cyan-600 transition duration-150"
      >
        Login
      </button>
      {errorMessage && (
        <div className="mt-4 p-4 bg-transparent text-white rounded-lg w-80 text-center">
          {errorMessage}
          <p className="mt-2">
            ¿Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-300 cursor-pointer"
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
