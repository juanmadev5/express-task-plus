import { useNavigate } from "react-router-dom";
import { User } from "../screens/home";

export default function TopBar({ name }: User) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full h-auto flex p-3 justify-between items-center bg-sky-950 rounded-2xl">
      <h2 className="text-2xl font-semibold max-md:text-sm">{name}</h2>
      <p onClick={handleLogout}>
        <a href="">Logout</a>
      </p>
    </div>
  );
}
