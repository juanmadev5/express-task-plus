import { useNavigate } from "react-router-dom";
import { User } from "../screens/home";

export default function TopBar({ name }: User) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-auto h-auto flex p-3 justify-between items-center max-md:w-full">
      <h2 className="text-2xl mr-8 font-semibold max-md:text-sm ml-2">
        {name}
      </h2>
      <p onClick={handleLogout}>
        <a href="">
          <img
            src="https://img.icons8.com/color/48/exit.png"
            className="w-8 h-8"
          ></img>
        </a>
      </p>
    </div>
  );
}
