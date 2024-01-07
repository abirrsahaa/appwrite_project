// he he nahi banaya na login kese banayega ata toh hai nahi

// login mai kya chahiye pehle soch le

// mujhe chahiye hoga email aur password ka field jo ki mai input mai lunga and submit karunga
// yeh input ka form i will be using react-hook-form ..jo use karne ke liye mereko luch cheeze sikhni padegi
// jese ki register,handlesubmit useform() se lena jo ki khud react-hook-form se milega

// ab register ka yeh scene hai ki woh mai jis bhi input field mai use karunga woh uska data mantain karega
// and handlesubmit basically kya karega ke woh ak function lega jo ki form submit karne poar hum chalana chahte hai

// ab manlo mujhe email aur password mil gaya and ab mujhe kya karna chahuye
// ab mujhe appwrite ki service se login karna chahiye ab login ke bad mai check karunga ke bhai login huya ke nahi
// by get current user karke ab mujhe milega to mai login wala dispatch kar dunga

// toh yeh hoga mera login ka flow
// key implementations jo dhyan rakhne hai mereko

// submit wala function
// form using react-hook-form and uske complications whenever necessary
// and input ki component use karni hai yaha !

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./index";

import authservice from "../appwrite/auth";
import { login as authlogin } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Error, setError] = useState(null);
  const [register, handlesubmit] = useForm();

  const login = async (data) => {
    setError("");
    try {
      const user = await authservice.login(data);
      if (user) {
        const current = await authservice.getCurrentUser();
        if (current) {
          dispatch(authlogin(current));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //   now i need the login form which i wil be needing the basic styling before i go
  // into the complications of using react-hook-form and using register and handlesubmit

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {Error && <p className="text-red-600 mt-8 text-center">{Error}</p>}
        <form onSubmit={handlesubmit(login)} className="mt-8">
          {/* here i will be basixally needing two field and a button */}
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email "
              {...register("email", {
                required: true,

                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="password"
              type="password"
              placeholder="type your password"
              {...register("password", {
                required: true,
              })}
            />
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
