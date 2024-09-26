import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import Home from "./screens/home";
import Register from "./screens/register";
import ProtectedRoute from "./protected-route";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
