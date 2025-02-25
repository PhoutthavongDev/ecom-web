import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email!!!" }),
    password: z.string().min(8, { message: "Password much 8" }),
    confrimPassword: z.string(),
  })
  .refine((data) => data.password === data.confrimPassword, {
    message: "Passsword is not match",
    path: ["confrimPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 3) {
    //   toast.warning("Password not Strong");
    //   return;
    // }
    try {
      const res = await axios.post("https://testapi-roan.vercel.app/api/register", data);
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  console.log(passwordScore);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-10 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                className={`border w-full px-3 py-2 rounded
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.email && "border-red-500"}
              `}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.email && "border-red-500"}
                `}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1 " key={index}>
                      <div
                        className={`h-3 ${
                          passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        } rounded-md`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("confrimPassword")}
                className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.email && "border-red-500"}
                `}
                placeholder="ConfirmPassword"
              />
              {errors.confrimPassword && (
                <p className="text-red-500">{errors.confrimPassword.message}</p>
              )}
            </div>
           
              <button className="bg-blue-500 rounded-lg w-full py-3 font-semibold text-white shadow-md hover:bg-blue-800">Register</button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
