import { useState } from "react";
import { Link } from "react-router-dom";
import userState from "../../../zustand/userState";
import { useNavigate } from "react-router-dom";


const UserMenu = () => {
  const { user, logout } = userState();
  const [isOpen, setIsOpen] = useState(false);
  const initial = user?.firstName?.[0]?.toUpperCase() || "?";
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const logautUser =() => {
  logout()
  navigate("/Login")
  }
  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold cursor-pointer shadow-md select-none"
      >
        {initial}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10"> {/* Removed border */}
          <Link
            to="/FavoritesPage"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>
          <button
            onClick={() => {
              logautUser();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;