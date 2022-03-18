import React from "react";
import Link from "next/link";
import {createRef} from "react";
import { userService } from "../../services/user.service";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import {customHelpers} from "../../helpers/custom-helpers";


export default function register(props) {
  const router = useRouter();
  const alert = useAlert();
  var username = createRef();
  var email = createRef();
  var password = createRef();
  var password2 = createRef();
  

  const registerUser = event => {
    event.preventDefault();
    var data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value
    }
    return userService.register(data).then(() => {
      alert.success("Registered! Please Login! ");
      userService.login(username.current.value, password.current.value).then(() => {
        const returnUrl = "";
        alert.success("Logged in!");
        router.push(returnUrl);
      }).catch((error) => {
        alert.error(error);
        alert.error("Bad/Wrong Credentials While Loggin In!");
      });
    }).catch((error) => {
      console.log(error);
      alert.error(error);
      alert.error("Bad/Wrong Credentials! While Registering!");
    });
    
    
    
    
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
                    href=""
                    // {google_login_url}
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      name="username"
                      required
                      ref={username}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      EMAIL
                    </label>

                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                      name="password2"
                      ref={password2}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-black text-white px-3 py-2 w-full"
                      // disabled={formState.isSubmitting}
                      type="submit"
                      
                    >
                      CONTINUE
                    </button>
                  </div>
                </form>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


