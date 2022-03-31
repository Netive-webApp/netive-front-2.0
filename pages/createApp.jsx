// return a simple form

import { createRef, useRef } from "react";
import { userService } from "../services/user.service.js";
import { customHelpers } from "../helpers/custom-helpers";
import axios from "axios";
import { useRouter } from "next/router";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function NewAppForm(props) {
  const router = useRouter();
  const [isAuthenticated, cookie] = customHelpers.checkAuth(router, "/", false);
;
  if (isAuthenticated){
    var data = userService.getDashboardData(cookie);
    console.log(email_verified);
    
    try {
      var email_verified = data[0]['email_confirmed'];
    } catch {
      var email_verified = false;
      //PASS;
    }
  }
  var childProps = {
    props,
    data
  }


  //#region declaring form variables
  var appName = createRef();
  var url = createRef();
  var icon = createRef();
  var package_name = createRef();
  var primaryColor = createRef();
  var primaryColorDark = createRef();
  var colorAccent = createRef();
  var keystoreName = createRef();
  var Name = createRef();
  var OrganizationUnit = createRef();
  var Organization = createRef();
  var City = createRef();
  var State = createRef();
  var CountryCode = createRef();
  var keystorePassword = createRef();
  var keyAlias = createRef();
  var keyPassword = createRef();
  var [submitting, setSubmitting] = useState(false);
  //#endregion

  const onSubmit = event => {
    event.preventDefault();
    submitting = setSubmitting(true);
    let form_data = new FormData();
    form_data.append("image", document.getElementById("icon").files[0]);
    form_data.append("appName", appName.current.value);
    form_data.append("url", url.current.value);
    form_data.append("package_name", package_name.current.value);
    form_data.append("primaryColor", primaryColor.current.value);
    form_data.append("primaryColorDark", primaryColorDark.current.value);
    form_data.append("colorAccent", colorAccent.current.value);
    form_data.append("keystoreName", keystoreName.current.value);
    form_data.append("Name", Name.current.value);
    form_data.append("OrganizationUnit", OrganizationUnit.current.value);
    form_data.append("Organization", Organization.current.value);
    form_data.append("City", City.current.value);
    form_data.append("State", State.current.value);
    form_data.append("CountryCode", CountryCode.current.value);
    form_data.append("keystorePassword", keystorePassword.current.value);
    form_data.append("keyAlias", keyAlias.current.value);
    form_data.append("keyPassword", keyPassword.current.value);

    axios
      .post(
        "https://netive-backend.herokuapp.com/api-info/register/app/",
        form_data,
        { headers: { Authorization: `Token ${cookie}` } }
      )
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        console.log("Erro! Creating App!");
        console.log(err);
      });
  }

  function readIcon() {
    icon = document.getElementById("icon").files[0];
    document
      .getElementById("icon_prev")
      .setAttribute("src", URL.createObjectURL(icon));
  }
  return (
    
    <>
      <Navbar />
      <AdminHeader props={childProps} />

      <div className="max-w-screen-xl  mx-auto w-full" style={{display:submitting ? "block" : "none"}}>
        <div className="mx-4 bg-white font-bold shadow-md p-8 rounded-md text-center">
          <div className="animate-bounce ">
            <span className="px-2 animate-pulse">
            <i className="fa-solid fa-tower-broadcast"></i>
            </span>
            Processing...
            </div>
        </div>
      </div>
      <div className="max-w-screen-xl  mx-auto w-full" style={{display:submitting?"none" : "block"}}>
        <div className="mx-4 bg-white shadow-md p-8 rounded-md">
        <small className="text-bold font-bold pt-8 pb-8">
          <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
          All Fields Are Required and no spaces allowed! except for name
          <br></br>
          Some Fields Are Prepopulated For Testing Purposes, You are adviced to change them
        </small>
          <form className="mt-8" onSubmit={onSubmit}>
            <h1 className="block uppercase text-blueGray text-lg font-bold mb-2">
              <span className="px-2">
                <i className="fa-solid fa-file-lines"></i>
              </span>
              Basic Information
            </h1>
            <div className="grid py-4 mt-8 mb-8 sm:grid-cols-1 md:grid-cols-2">
              <div className="relative w-full my-5 px-2">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  AppName
                </label>
                <input
                  
                  type="text"
                  className=" customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="MyCoolApp"
                  required
                  pattern="^\S+$"
                  ref={appName}
                />
              </div>
              <div className="relative w-full my-5 px-2">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Website URL
                </label>
                <input
                  type="url"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="http://mycoolapp.com"
                  required
                  pattern="^\S+$"
                  ref={url}
                />
              </div>
              <div className="grid grid-cols-2 my-5 px-2  md:grid-cols-1">
                <div className="relative w-full">
                  <label
                    className="required block uppercase text-blueGray text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    App Icon
                  </label>
                  <input
                    type="file"
                    className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={readIcon}
                    id="icon"
                    accept="image/png"
                    ref={icon}
                    required
                  />
                  
                </div>
                <small className="text-bold font-bold pt-8">
                    <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
                    Please Make Sure it is a PNG file and dimensions are
                    rectangular, eg. 512x512
                  </small>
                <div className="app-icon-holder pt-2">
                  <img className="app-icon-display" id="icon_prev" required />
                </div>
              </div>

              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Package Name
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="com.mycoolapp.app"
                  required
                  pattern="^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$"
                  ref={package_name}
                />
              </div>
            </div>
            <hr className=" border-b-1 border-blueGray-300 mt-8 mb-8" />

            <h1 className="block uppercase text-blueGray text-lg font-bold mb-2">
              
              <span className="px-2">
              <i className="fa-solid fa-droplet"></i>
              </span>Color Scheme
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 sm-gr py-4 mt-8 mb-8 ">
              <div className="relative w-full px-6 py-3 ">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Primary Color
                </label>
                <input
                  type="color"
                  className="rounded w-full ease-linear transition-all duration-150"
                  required
                  ref={primaryColor}
                />
              </div>
              <div className="relative w-full px-6 py-3">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Primary Color Dark
                </label>
                <input
                  type="color"
                  className="rounded w-full ease-linear transition-all duration-150"
                  required
                  ref={primaryColorDark}
                />
              </div>
              <div className="relative w-full px-6 py-3">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Color
                </label>
                <input
                  type="color"
                  className="rounded w-full ease-linear transition-all duration-150"
                  required
                  ref={colorAccent}
                />
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />
            <h1 className="block uppercase text-blueGray text-lg font-bold mb-8">
              
              
              <span className="px-2">
              <i className="fa-solid fa-key"></i>
              </span>Keystore Information
            </h1>


            
            <small className="text-bold font-bold">
            <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
              Currently we only support creating new keystore per app,
              later we will support premade keystores
            </small>

            
            <div className="grid py-4 mt-8 mb-8 sm:grid-cols-1 md:grid-cols-2">
              <div className="relative w-full my-5 px-2">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Keystore Name
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="My keystore"
                  required
                  pattern="^\S+$"
                  defaultValue={"keystore"}
                  ref={keystoreName}
                />
              </div>

              <div className="relative w-full my-5 px-2">
                <label
                  className="required block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="John Doe"
                  ref={Name}

                  required
                />
              </div>

              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Organizational Unit
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Unit"
                  defaultValue={"unit"}
                  required
                  ref={OrganizationUnit}
                />
              </div>

              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Organization
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="My Company"
                  defaultValue={"organization"}
                  required
                  pattern="^\S+$"
                  ref={Organization}
                />
              </div>
            </div>
            <div className="grid py-4 mt-8 mb-8 sm:grid-cols-1 md:grid-cols-2">
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  City
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="City"
                  required
                  defaultValue={"city"}
                  pattern="^\S+$"
                  ref={City}
                />
              </div>
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  State
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="State"
                  defaultValue={"state"}
                  required
                  pattern="^\S+$"
                  ref={State}
                />
              </div>
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Country Code
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="eg. US"
                  minLength={2}
                  maxLength={2}
                  pattern="^\S+$"
                  defaultValue={"XX"}
                  required
                  ref={CountryCode}
                />
              </div>
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Alias
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Key Alias"
                  defaultValue={"alias"}
                  required
                  pattern="^\S+$"
                  ref={keyAlias}
                />
              </div>
            </div>

            <div className="grid py-4 mt-8 mb-8 sm:grid-cols-1 md:grid-cols-2">
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Keystore Password
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Keystore Password"
                  required
                  pattern="^\S+$"
                  ref={keystorePassword}
                />
              </div>
              <div className="relative w-full my-5 px-2">
                <label
                  className="block uppercase text-blueGray text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Key Password
                </label>
                <input
                  type="text"
                  className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Key Password"
                  required
                  pattern="^\S+$"
                  ref={keyPassword}
                />
              </div>
              
              
            </div>
            <small className="text-bold font-bold">
              <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
                We do not store these credentials, they are only used to
                generate the keystore Please keep them somewhere safe and
                secure.
              </small>

           

            <div className="text-center mt-6 grid grid-cols-1 ">
              <button
                className="bg-blueGray text-white p-3 text-lg"
                type="submit"
              >
                Create App
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


/*

 <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  className="form-checkbox customBorder rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                
                <span className="ml-2 text-sm font-semibold text-blueGray">
                  I agree with the{" "}
                  <a
                    href="#pablo"
                    className="text-lightBlue-500"
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

*/


