import { Link } from "react-router-dom";
import userState from "../../../zustand/userState";
import UserMenu from "./UserMenu";

const RegisterButton = () => {
  const { user, isAuthenticated } = userState();

  if (isAuthenticated && user) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/uzerRegistration"
        className="group relative px-5 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105"
      >
        <span className="relative z-10">Register</span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <Link
        to="/Login"
        className="group relative px-5 py-2 overflow-hidden rounded-lg border-2 border-violet-600 text-violet-600 text-sm font-semibold transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105"
      >
        <span className="relative z-10">Login</span>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Link>
    </div>
  );
};

export default RegisterButton;
