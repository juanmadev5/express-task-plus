import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import Home from "./screens/home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
