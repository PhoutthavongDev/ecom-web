import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Mainnav = () => {
  const carts = useEcomStore((state) => state.carts);
  const clearUser = useEcomStore((state) => state.clearUser);
  const user = useEcomStore((s) => s.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
            {/* Badge */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/cart"}
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropDown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-1 rounded-md"
              >
                <img
                  src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png?f=webp&w=256"
                  className="w-12 h-12"
                />
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute mt-2 top-14 bg-white shadow-md z-50">
                  <Link
                    className="px-4 py-2 block hover:bg-gray-200"
                    to={"/user/history"}
                  >
                    History
                  </Link>
                  <Link
                    className="px-4 py-2 block hover:bg-gray-200"
                    to={"/"}
                    onClick={() => clearUser()}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-semibold "
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
                }
                to={"/register"}
              >
                Register
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-semibold "
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Mainnav;
