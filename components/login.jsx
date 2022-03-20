import React from "react";
import Link from "next/link";
import { userService } from "../services/user.service";
import { createRef } from "react";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const alert = useAlert();
  var [submitting, setSubmitting] = useState(false);
  const google_login_url =
    "https://netive-backend.herokuapp.com/accounts/google/login";
  const router = useRouter();

  var username = createRef();
  var password = createRef();

  const onSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    return userService
      .login(username.current.value, password.current.value)
      .then(() => {
        // get return url from query parameters or default to '/'
        alert.success("Logged in!");
        router.push("/");
      }).catch((error) => {alert.error("Bad/Wrong Credentials!");setSubmitting(false);console.log(error)});
      
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full mt-16 ">
        <div className="flex content-center items-center justify-center h-full ">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0 bg-white p-3">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in
                  </h6>
                </div>
                {/*<div className="btn-wrapper text-center">
                  <a
                    href={google_login_url}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/google.svg" />
                    Google
                  </a>
  </div>*/}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/*<div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>*/}
                <form onSubmit="">
                  {/* {handleSubmit(onSubmit)} */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>

                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      name="username"
                      ref={username}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      ref={password}
                    />
                  </div>


                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray pt-2 pb-2 text-white w-full disabled:opacity-50"
                      disabled={submitting}
                      type="button"
                      onClick={onSubmit}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center">
                {/* <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
                </div>*/}
                <div className="font-bold underline">
                  <Link href="/auth/register">
                    <a href="#pablo" className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;



/*

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  
*/



