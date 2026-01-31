import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <ul className="flex flex-row items-center gap-[30px] list-none text-[16px] px-6 py-4">
      <li className="text-blue-600 font-bold text-[24px] w-1/2">
        Study Hub
      </li>
      <li
        className="cursor-pointer hover:text-blue-500"
        onClick={() => navigate("/")}
        >
        Home
      </li>
      {!user && (
        <li
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </li>
      )}
      {user && (
        <>
          {user.role === "ADMIN" && (
            <li className="cursor-pointer">
              Admin
            </li>
          )}

          <li
            className="cursor-pointer text-blue-500"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/auth/login");
            }}
          >
            Logout
          </li>
        </>
      )}
    </ul>
  );
}
