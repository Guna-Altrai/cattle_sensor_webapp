import React, { useMemo, useState } from "react";
import koizIcon from "../assets/koiz-full-trans.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeOpen } from "../assets/SVG/EyeOpen";
import { EyeOff } from "../assets/SVG/EyeOff";
import { loginValidationSchema } from "../Validation/Validator";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../Context";
import { updateAuthCheckParams } from "../Redux/Features/commonSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../Context/apiContext";
import {
  useLoginMutation,
  useUserDataMutation,
} from "../Redux/Auth/Authentication.Api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  const [login] = useLoginMutation();
  const [userData, { data: userList }] = useUserDataMutation();
  console.log("retrieved data :", userList);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { saveSession } = useAuthContext();

  const redirectUrl = useMemo(
    () =>
      location.state && location.state.from
        ? location.state.from.pathname
        : "/dashboard",
    [location.state]
  );

  const loginSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      console.log("login result:", result);
      saveSession(result.id);
      dispatch(updateAuthCheckParams(result));
      if (result?.id > 0) {
        navigate(redirectUrl);
      }
    } catch (err) {
      console.error("Login err :", err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center max-sm:h-screen px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          <img className="w-auto h-10 mr-2" src={koizIcon} alt="logo" />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit((data) => loginSubmit(data))}
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  autoFocus
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 font-medium text-sm tracking-wider">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  autoComplete="off"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-[70%] transform -translate-y-1/2"
                >
                  {passwordVisible ? (
                    <EyeOpen size={24} className={"from-neutral-950"} />
                  ) : (
                    <EyeOff size={24} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 font-medium text-sm tracking-wider">
                  {errors.password?.message}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
