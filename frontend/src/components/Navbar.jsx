import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // logout icon

import axios from "axios";

const Navbar = () => {
  const { isLogin, user, setUser, setIsLogin } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsLogin(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link
        to={"/"}
        className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer select-none"
      >
        SplitMate
      </Link>

      {/* Center Navigation */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-8">
          <a
            href="/#features"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            Features
          </a>
          <a
            href="/#working"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium mr-5"
          >
            How it Works
          </a>
        </div>

        {isLogin && (
          <div className="flex gap-8">
            <Link
              to={"/dashboard"}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to={"/groups"}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Groups
            </Link>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div>
        {!isLogin ? (
          <Link
            to={"/login"}
            className="px-4 py-1.5 rounded-md bg-gray-900 text-white font-semibold shadow hover:bg-black/90 transition-colors duration-200"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            {/* Logout Icon Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              aria-label="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-700" />
            </button>

            <span className="text-gray-700 font-medium">{user.username}</span>
            <Avatar className="h-8 w-8 ring-1 ring-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* Logout Button */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
