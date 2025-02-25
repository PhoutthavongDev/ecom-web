import React, { useState } from "react";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //javascript

  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  const user = useEcomStore((sate) => sate.user);
  console.log("user form zustan", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      console.log("res", res);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      const errmsg = err.response?.data?.message;
      toast.error(errmsg);
      console.log(err);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-10 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                className="border w-full rounded py-2 px-1"
                onChange={handleOnChange}
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                className="border w-full rounded py-2 px-1"
                onChange={handleOnChange}
                name="password"
                type="text"
                placeholder="Password"
              />
            </div>
            <button className="bg-blue-500 rounded-md w-full py-2 hover:bg-blue-700 font-bold text-white">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
