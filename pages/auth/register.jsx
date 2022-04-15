import React from "react";
import Link from "next/link";
import {createRef} from "react";
import { userService } from "../../services/user.service";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import {customHelpers} from "../../helpers/custom-helpers";
import {useState} from 'react';


export default function Register(props) {
  const router = useRouter();
  const alert = useAlert();
  var username = createRef();
  var email = createRef();
  var password = createRef();
  var password2 = createRef();
  const google_login_url = "https://netive-backend.herokuapp.com/accounts/google/login";
  var [submitting, setSubmitting] = useState(false);

  const registerUser = event => {
    event.preventDefault();
    setSubmitting(true);
    var data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value
    }
    return userService.register(data).then(() => {
      alert.success("Registered! Please Login! ");
      userService.login(data.username, data.password).then(() => {
        alert.success("Logged in!");
        alert.info("Please check your email for verification!");
        router.push("/");
      }).catch((error) => {
        console.log(error);
        setSubmitting(false);
        alert.error("Bad/Wrong Credentials While Loggin In!");
      });
    }).catch((error) => {
      console.log(error);
      setSubmitting(false);
      alert.error("Bad/Wrong Credentials! While Registering!");
    });
    
    
    
    
  }

  function click(){
    window.open(google_login_url,'name','width=600,height=400')
  }
  return (
    <>

      <div className="container mx-auto px-4 h-full mt-16">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    CREATE NEW ACCOUNT
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <a
                    href="#"
                    onClick={click}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/google.svg" />
                    Google
                  </a>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small></small>
                </div>
                <form onSubmit={registerUser}>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>

                    <input
                      type="text"
                      className="border-0 customBorder px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      name="username"
                      required
                      ref={username}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block customBorder uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      EMAIL
                    </label>

                    <input
                      type="email"
                      className="border-0 customBorder px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="your@email.com"
                      name="email"
                      required
                      ref={email}
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
                      className="border-0 customBorder px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      required
                      ref={password}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Re-Password
                    </label>

                    <input
                      type="password"
                      className="border-0 customBorder px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                      name="password2"
                      ref={password2}
                    />
                  </div>
                  <small >
                    <ul>
                      <li className="text-red-500 font-bold">Password more than 8 Chars long</li>
                      <li className="text-red-500 font-bold">Should Not be a common password</li>
                      <li className="text-red-500 font-bold">Username Should Be Unique</li>
                    </ul>
                    
                  </small>

                  <div className="text-center mt-6">
                    <button
                      className="bg-black text-white btn-custom px-3 py-2 w-full disabled:opacity-50"
                      disabled={submitting}
                      type="submit"
                    >
                      {submitting &&
                      <span className="animate-bounce mx-2">
                      <i className="fa-solid fa-spinner"></i>
                      </span>}
                      CONTINUE
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center pb-6 font-bold underline ">
                  <Link href="/auth/login">
                    <a href="#pablo" className="text-blueGray-200">
                      <small>Or Log in</small>
                    </a>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


