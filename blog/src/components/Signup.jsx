// for signup all the fuctionalities will be same as in login
// but here we need to use a different appwrite service which will be the create account service
// this service will automatically login as a result even here we can dispatch the login state from authslice

import { useState } from "react";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, handlesubmit] = useForm();

  const signup = async (data) => {
    //here i wil be implementing the create account functionality as this is what this function will do
    setError("");
    try {
      const account = await authservice.createAccount(data);
      if (account) {
        const session = await authservice.getCurrentUser();
        if (session) {
          dispatch(authlogin(session));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //   now i will be needing the styles for signing up page

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {Error && <p className="text-red-600 mt-8 text-center">{Error}</p>}
        <form onSubmit={handlesubmit(signup)}>
          <div>
            <Input
              label="Full name: "
              type="text"
              placeholder="Enter your Full name "
              {...register("name", {
                required: true,
              })}
            />
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
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
