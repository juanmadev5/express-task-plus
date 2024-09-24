import { useNavigate } from "react-router-dom";

export default function TopBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <div className="w-full h-auto flex p-3 justify-between items-center bg-sky-950 rounded-2xl">
      <h2 className="text-2xl font-semibold">Tasks</h2>
      <p onClick={handleLogout}>
        <a href="">Logout</a>
      </p>
    </div>
  );
}
