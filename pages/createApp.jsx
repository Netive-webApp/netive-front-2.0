// return a simple form

import { createRef, useRef } from "react";
import { userService } from "../services/user.service.js";
import { customHelpers } from "../helpers/custom-helpers";
import axios from "axios";
import { useRouter } from "next/router";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import { useState } from "react";

import CustomColorPickerH from "../components/ColorPicker";


export default function NewAppForm(props) {
  const router = useRouter();
  const [isAuthenticated, cookie] = customHelpers.checkAuth(router, "/", false);
  const [formState, setFormState] = useState(0);
;
  if (isAuthenticated){
    var data = userService.getDashboardData(cookie);
  
    
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
  var primaryColor = '';
  var primaryColorDark = '';
  var colorAccent = '';
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
    readColors();
    let form_data = new FormData();
    form_data.append("image", document.getElementById("icon").files[0]);
    form_data.append("appName", appName.current.value);
    form_data.append("url", url.current.value);
    form_data.append("package_name", package_name.current.value);
    form_data.append("primaryColor", primaryColor);
    form_data.append("primaryColorDark", primaryColorDark);
    form_data.append("colorAccent", colorAccent);
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

  function readColors(){
    var el1 = document.getElementById("colorcustom_primary");
    var el2 = document.getElementById("colorcustom_primaryDark");
    var el3 = document.getElementById("colorcustom_accent");
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    primaryColor = rgb2hex(el1.style.backgroundColor)
    primaryColorDark = rgb2hex(el2.style.backgroundColor)
    colorAccent = rgb2hex(el3.style.backgroundColor)
  }

  function formStepForward(){
    var nextState = formState + 1;
    if (nextState > 2) {
      nextState = 2;
    }
    
    setFormState(nextState);
    console.log(formState);
  }
  function formStepBackward(){
    var nextState = formState - 1;
    if (nextState < 0) {
      nextState = 0;
    }
    setFormState(nextState);
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
      <h1 className="mx-2 text-blueGray-700 text-Left text-4xl font-light my-6 hover:underline">#Create A New App </h1>
        <div className="mx-4 bg-white shadow-md p-8 rounded-md form-custom">
        <small className="text-bold font-bold pt-8 pb-8">
          <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
          All Fields Are Required and no spaces allowed! except for name
          <br></br>
          Some Fields Are Prepopulated For Testing Purposes, You are adviced to change them
        </small>
        
          <form className="mt-8" onSubmit={onSubmit}>
              <div id="section-1">
                
                <details>
                <div className="help">
                  <small className="text-bold font-bold pt-8 pb-8">
                  <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">ABOUT</span>
                    This section contains the basic information about your app.
                    Appname, package name, icon etc.
                    Here is the basic terminology:
                    <br></br>
                    <br></br>
                    <ul>
                      <li className="my-2">
                      -&gt; Package Name:- commonly Companies use their reversed Internet domain name to begin their package names
                      </li>
                      <li className="my-2">
                      for example:- 
                      com.example.app for a app created for company example.com.
                      </li>
                      <li className="my-2">
                      <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">NOTE</span>
                      It is important that the package name MUST NOT CONTAIN the word "package".
                      </li>
                    </ul>
                    <br></br>
                    <a target="_blank" className="rounded-full bg-green-400 uppercase mt-3 px-2 py-1 font-white text-white text-xs font-bold mr-3" href="https://support.google.com/admob/answer/9972781?hl=en#:~:text=The%20package%20name%20of%20an,supported%20third%2Dparty%20Android%20stores.">What is package name?</a>
                  </small>
                </div>
                  <summary className="underline hover:cursor-pointer text-blueGray text-lg font-bold mb-2">
                      
                        <span className="px-2">
                          <i className="fa-solid fa-file-lines"></i>
                        </span>
                        Basic Information
                  </summary>
                  <div className="content">
                      <div className="grid py-4 mt-8 mb-8 sm:grid-cols-1 md:grid-cols-2">
                        <div className="relative w-full my-5 px-2">

                          <label
                            className="required block uppercase text-blueGray text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            
                          >
                            AppName 
                            <span className="tooltip mx-2"> ❓
                              <span className="tooltiptext">App name must not contain any spaces. Eg- MyApp</span>
                            </span>
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
                            <span className="tooltip mx-2"> ❓
                              <span className="tooltiptext">Must be a valid url. Eg.- https://youtube.com</span>
                            </span>
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
                              <span className="tooltip mx-2"> ❓
                                <span className="tooltiptext">Only a png file accepted.</span>
                              </span>
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
                            <img className="app-icon-display" src="" id="icon_prev" required />
                          </div>
                        </div>

                        <div className="relative w-full my-5 px-2">
                          <label
                            className="block uppercase text-blueGray text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Package Name
                            <span className="tooltip mx-2"> ❓
                              <span className="tooltiptext">The package name of an Android app uniquely identifies your app on the device, in Google Play Store, and in supported third-party Android stores.</span>
                            </span>
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
                  </div>
                </details>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />
              <div id="section-2">
                
                <details>
                <div className="help">
                  <small className="text-bold font-bold pt-8 pb-8">
                  <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">ABOUT</span>
                    The color scheme for your app.
                    Leave unchanged if not sure what to do.
                    <br></br>
                    <br></br>
                    <ul>
                      <li>
                        -&gt; Primary Color:- The color of the app bar.
                      </li>
                      <li>
                      -&gt; Primary Color Dark:- The color of the status bar and contextual app bars; this is normally a dark version of colorPrimary.
                      </li>
                      <li>
                      -&gt; Color:- The color of UI controls such as check boxes, radio buttons, and edit text boxes.
                      </li>
                    </ul>
                    <br></br>
                    <a target="_blank" className="rounded-full bg-green-400 uppercase mt-3 px-2 py-1 font-white text-white text-xs font-bold mr-3" href="https://support.google.com/admob/answer/9972781?hl=en#:~:text=The%20package%20name%20of%20an,supported%20third%2Dparty%20Android%20stores.">What is package name?</a>
                  </small>
                </div>
                  <summary className="underline hover:cursor-pointer text-blueGray text-lg font-bold mb-2">
                      
                  <span className="px-2">
                  <i className="fa-solid fa-droplet"></i>
                  </span>Color Scheme
                  </summary>
                  <div className="content">
                  <div className="grid grid-cols-1 md:grid-cols-2 sm-gr py-4 mt-8 mb-8 ">
                  <div className="relative w-full px-6 py-3 ">
                    <label
                      className="required block uppercase text-blueGray text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Primary Color
                    </label>
                    <CustomColorPickerH id="colorcustom_primary"/>
                  </div>
                  <div className="relative w-full px-6 py-3">
                    <label
                      className="required block uppercase text-blueGray text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Primary Color Dark
                    </label>
                    <CustomColorPickerH id="colorcustom_primaryDark"/>
                  </div>
                  <div className="relative w-full px-6 py-3">
                    <label
                      className="required block uppercase text-blueGray text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Color
                    </label>
                    <CustomColorPickerH id="colorcustom_accent"/>
                  </div>
                </div>
                  </div>
                </details>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />
            
            <div id="section-3">
              
              <details>
              <div className="help">
                <small className="text-bold font-bold pt-8 pb-8">
                <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">ABOUT</span>
                  a keystore file is to authenticate yourself to anyone who is asking.
                  <br></br>
                  <br></br>
                  <ul>
                    <li>
                      it is your certificate
                    </li>
                    <li>
                    You are branding your application with your credentials.
                    </li>
                    <li>
                    Android Market requires you to sign all apps you publish with a certificate
                    </li>
                    <li>
                    -&gt; Keystore Password:- Create a secure password for your keystore.
                    </li>
                    <li>
                    -&gt; Key Password:- Create and confirm a secure password for your key. This should be the same as your keystore password. (Please refer to the known issue for more information)
                    </li>
                    <li>
                    -&gt; Alias:- Enter an identifying name for your key.
                    </li>
                  </ul>
                  <br></br>
                  
                  <a target="_blank" className="rounded-full bg-green-400 uppercase mt-3 px-2 py-1 font-white text-white text-xs font-bold mr-3" href="https://developer.android.com/training/articles/keystore#:~:text=The%20Android%20Keystore%20system%20lets,key%20material%20remaining%20non%2Dexportable.">What is Keystore?</a>
                  <a target="_blank" className="rounded-full bg-green-400 uppercase mt-3 px-2 py-1 font-white text-white text-xs font-bold mr-3" href="https://developer.android.com/studio/publish/app-signing">Learn More</a>
                </small>
              </div>
                <summary className="underline hover:cursor-pointer text-blueGray text-lg font-bold mb-2">
                    
                <span className="px-2">
                <i className="fa-solid fa-key"></i>
                </span>Keystore Information
                </summary>
                <div className="content">
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Choose a simple Name of your keystore or leave unchanged.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Your Name</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">It is the name of the department of your company in which you work, if you work at one. See here for example. I usually put IT in that field.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Name of your organization.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">The city of your organization.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">In what state of your country is your organization?.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Country Code of your country in two letters. Eg- USA would be US</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">the alias field should be a unique string to identify the key entry. This applies to all types such a trusted and intermediate.</span>
                    </span>
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Password of your keystore.</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Keystore Password"
                    required
                    minLength={7}
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
                    <span className="tooltip mx-2"> ❓
                      <span className="tooltiptext">Password for your key alias.  </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Key Password"
                    required
                    minLength={7}
                    pattern="^\S+$"
                    ref={keyPassword}
                  />
                </div>
                
                
              </div>
              <small className="text-bold font-bold">
                <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
                  A valid password can contain 6 to 30 characters, begin with an alphabetic character, and use only alphanumeric characters.
              </small>
                </div>
              </details>
              <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />
              <div className="text-center mt-6 grid grid-cols-1 ">

                <button
                  className="btn-custom text-white p-3 text-lg"
                  type="submit"
                  
                >
                  Create App
                </button>
                
              </div>
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


