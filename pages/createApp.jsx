// return a simple form

import { createRef, useRef } from "react";
import { userService } from "../services/user.service.js";
import { customHelpers } from "../helpers/custom-helpers";
import { verifiers } from "../helpers/form-verifiers.js";
import axios from "axios";
import { useRouter } from "next/router";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import { useState } from "react";

import CustomColorPickerH from "../components/ColorPicker";
import { useAlert } from "react-alert";






export default function NewAppForm(props) {
  const alert = useAlert();
  const router = useRouter();
  const [isAuthenticated, cookie] = customHelpers.checkAuth(router, "/", false);
  const [formState, setFormState] = useState(1);
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
  var keystore = createRef();
  var GSFile = createRef();
  var GSFileAndroid = createRef();
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
  var [splashScreenType, setSplashScreenType] = useState('fade');
  var admob = createRef();
  var pushNoti = createRef();
  var provisioningProfile = createRef();
  var certificate = createRef();
  var admob_id = createRef();
  var banner_id = createRef();
  var keystorePassword2 = createRef();
  var [keystore_setting, setKeystoreSetting] = useState('new');


  var platform = {
    'android': true,
    'ios': false
  }

  var step1_vars = {
    appName,
    url,
    icon,
    platform

  }
  var step2_vars = {
    package_name
  }
  var step3_vars = {
    splashScreenType,
  }
  var step4_vars = {
    admob,
    pushNoti,
    admob_id,
    banner_id,
    GSFile,
    GSFileAndroid

  }
  var step5_vars = {
    primaryColor,
    primaryColorDark,
    colorAccent,
  }
  var step6_vars = {
    keystore_setting,
    keystore,
    keyAlias,
    Organization,
    keyAlias,
    keystorePassword,
    keystorePassword2,
    platform,
    certificate,
    provisioningProfile,
    keyPassword,
    Name
  }
  var steps = [
    step1_vars,
    step2_vars,
    step3_vars,
    step4_vars,
    step5_vars,
    step6_vars
  ]
  //#endregion

  //#region functions
  const onSubmit = event => {
    event.preventDefault();
    let verification1 = verifiers[0](step1_vars);
    let verification2 = verifiers[1](step2_vars);
    let verification3 = verifiers[2](step3_vars);
    let verification4 = verifiers[3](step4_vars);
    let verification5 = verifiers[4](step5_vars);
    let verification6 = verifiers[5](step6_vars);
    if (!verification1[1]){
      alert.error(verification1[0]);
    } else if (!verification2[1]){
      alert.error(verification2[0]);
    } else if (!verification3[1]){
      alert.error(verification3[0]);
    } else if (!verification4[1]){
      alert.error(verification4[0]);
    } else if (!verification5[1]){
      alert.error(verification5[0]);
    } else if (!verification6[1]){
      alert.error(verification6[0]);
    } else {
      
      
      readColors();
      let form_data = new FormData();
      form_data.append("image", document.getElementById("icon").files[0]);
      form_data.append("appName", appName.current.value);
      form_data.append("url", url.current.value);
      form_data.append("package_name", package_name.current.value);
      form_data.append("primaryColor", primaryColor);
      form_data.append("primaryColorDark", primaryColorDark);
      form_data.append("colorAccent", colorAccent);
      form_data.append("keystoreName", "keystore");
      form_data.append("Name", Name.current.value ? Name.current.value != "" : 'john doe');
      form_data.append("OrganizationUnit", "IT");
      form_data.append("Organization", Organization.current.value ? Organization.current.value != "" : 'company');
      form_data.append("City", "XX");
      form_data.append("State", "XX");
      form_data.append("CountryCode", "XX");

      
      form_data.append("keystorePassword", keystorePassword.current.value ? keystorePassword.current.value != "" : "123456789");
      
      form_data.append("keyAlias", keyAlias.current.value ? keyAlias.current.value != "" : "alias");
      form_data.append("keyPassword", keystorePassword.current.value ? keystorePassword.current.value != "" : "123456789");

      form_data.append("keystorePassword2", keystorePassword2.current.value ? keystorePassword2.current.value != "" : "123456789");
      form_data.append("ios_certificate_password", keyPassword.current.value ? keyPassword.current.value != "" : "123456789");
      
      form_data.append("admob", admob.current.value);
      form_data.append("pushNoti", pushNoti.current.value);
      form_data.append("provisioningProfile", provisioningProfile.current.value);
      form_data.append("certificate", certificate.current.value);
      form_data.append('splashScreenType', splashScreenType);
      form_data.append("platform", platform);
      form_data.append("admob_id", admob_id.current.value);
      form_data.append("banner_id", banner_id.current.value);
      form_data.append("GSFile", GSFile.current.value);
      form_data.append("keystore_setting", keystore_setting);
      form_data.append("keystore", keystore.current.files[0]);

      
      




      
      
      submitting = setSubmitting(true);
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
        console.log("Error! Creating App!");
        alert.error("Error! Creating App! Please Contact Support if the error persists.");
        router.push("/");
        console.log(err);
      });
      
      
      

      alert.success('App Registration Successful! Please wait.');
    }


  }
  function readIcon() {
    icon = document.getElementById("icon").files[0];
    document
      .getElementById("icon-label")
      .style.background = `url(${URL.createObjectURL(icon)}) no-repeat center center`;
    document
      .getElementById("icon-label")
      .style.backgroundSize = `contain`;
    document.getElementById("icon-label").innerHTML = "";
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
  function readKeystore() {
    icon = document.getElementById("keystoreFile").files[0];
    document.getElementById("keystoreFileLabel").innerHTML = icon.name;
  }
  function readGoogleService() {
    icon = document.getElementById("GoogleServiceFile").files[0];
    document.getElementById("GoogleServiceFileLabel").innerHTML = icon.name;
  }
  function readGoogleServiceAndroid() {
    icon = document.getElementById("GoogleServiceFileAndroid").files[0];
    document.getElementById("GoogleServiceFileLabelAndroid").innerHTML = icon.name;
  }
  function readCert() {
    icon = document.getElementById("certificateFile").files[0];
    document.getElementById("certificateFileLabel").innerHTML = icon.name;
    console.log('isd')
  }
  function readPP() {
    icon = document.getElementById("ppFile").files[0];
    document.getElementById("ppFileLabel").innerHTML = icon.name;
  }
  function formStepForward(){
    var nextState = formState + 1;
    let verification = verifiers[formState-1](steps[formState-1]);
    if (verification[1]) {
      document.body.scrollIntoView({ behavior: "smooth", block: "start" });
      
      
      setFormState(nextState);
      
      if (nextState > 7) {
        nextState = 7;
      }
      if (nextState < 7) {
      
        document.getElementById("section-1").style.display = "none";
        document.getElementById("section-2").style.display = "none";
        document.getElementById("section-3").style.display = "none";
        document.getElementById("section-4").style.display = "none";
        document.getElementById("section-5").style.display = "none";
        document.getElementById("section-6").style.display = "none";
        document.getElementById("submit_button").style.display = "none";
        var s = "section-"+nextState;
        console.log(s)
        document.getElementById(s).style.display = "block";
      } else if (nextState == 7){
        document.getElementById("section-1").style.display = "block";
        document.getElementById("section-2").style.display = "block";
        document.getElementById("section-3").style.display = "block";
        document.getElementById("section-4").style.display = "block";
        document.getElementById("section-5").style.display = "block";
        document.getElementById("section-6").style.display = "block";
        document.getElementById("submit_button").style.display = "block";
        
      }
    } else {
      alert.error(verification[0]);
    }
  }
  function formStepBackward(){
    var nextState = formState - 1;
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    if (nextState < 1) {
      nextState = 1;
    }

    
    setFormState(nextState);
    document.getElementById("section-1").style.display = "none";
    document.getElementById("section-2").style.display = "none";
    document.getElementById("section-3").style.display = "none";
    document.getElementById("section-4").style.display = "none";
    document.getElementById("section-5").style.display = "none";
    document.getElementById("section-6").style.display = "none";
    document.getElementById("submit_button").style.display = "none";
    var s = "section-"+nextState;
    console.log(s)
    document.getElementById(s).style.display = "block";
  }
  function splashScreenNone(){
    setSplashScreenType('simple')
  }
  function splashScreenFade(){
    setSplashScreenType('fade')
  }
  function splashScreenZoom(){
    setSplashScreenType('zoom')
  }
  function doss(){
    if (admob.current.checked == true || pushNoti.current.checked == true){
      document.getElementById('google_service').style.display = "block";
    } else {
      document.getElementById('google_service').style.display = "none";

    }
  }

  //#endregion


  function newKeystore(){
    document.getElementById("newKeystore").style.display = "block"
    document.getElementById('haveKeystore').style.display = "none"
    document.getElementById('unsignedKeystore').style.display = "none"
    keystore_setting = 'new'
  }
  function haveKeystore(){
    document.getElementById("newKeystore").style.display = "none"
    document.getElementById('haveKeystore').style.display = "block"
    document.getElementById('unsignedKeystore').style.display = "none"
    setKeystoreSetting('have')
  }
  function unsignedKeystore(){
    document.getElementById("newKeystore").style.display = "none"
    document.getElementById('haveKeystore').style.display = "none"
    document.getElementById('unsignedKeystore').style.display = "block"
    setKeystoreSetting('unsigned')
  }
  function platformChoose(){
    var android = document.getElementById("androidApp");
    var ios = document.getElementById("iOSApp");

    if (android.checked == true){
      platform['android'] = true;
      let q = document.getElementsByClassName("android_inputs")
      for (var i = 0; i < q.length; i++) {
        q[i].style.display = "block";
      
      }
    } else {
      platform['android'] = false;
      let q = document.getElementsByClassName("android_inputs")
      for (var i = 0; i < q.length; i++) {
        q[i].style.display = "none";
      }
    }

    if (ios.checked == true){
      platform['ios'] = true;
      let q = document.getElementsByClassName("iosInputs")
      for (var i = 0; i < q.length; i++) {
        q[i].style.display = "block";
      
      }
    } else {
      platform['ios'] = false;
      let q = document.getElementsByClassName("iosInputs")
      for (var i = 0; i < q.length; i++) {
        q[i].style.display = "none";
      }
    }
    
    
    
  }
  





  return (
    
    <>
      <Navbar props={[data, 'block']}/>
      
      

      <div className="max-w-screen-xl  mx-auto w-full" style={{display:submitting ? "block" : "none"}}>
        <div className="mx-4 bg-white font-bold shadow-md p-8 rounded-md text-center">
          <div className="animate-bounce ">
            
            <div className="loader">
                <img src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-28.jpg" className="w-full h-10 w-10" />
              </div>
              </div>
        </div>
      </div>
      

      <div className="max-w-screen-xl  mx-auto w-full" id="create-app-form" style={{display:submitting?"none" : "block"}}>
      <h1 className="mx-2 text-blueGray-700 text-Left text-4xl font-light my-6 hover:underline">#Create A New App </h1>
        <div className="mx-4 bg-white shadow-md p-8 rounded-md form-custom">
        <small className="text-bold font-bold pt-8 pb-8">
          <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
          All Fields Are Required and no spaces allowed! except htmlFor name
          <br></br>
          Some Fields Are Prepopulated For Testing Purposes, You are adviced to change them
        </small>
        
        <form className="create_app_form" id="start">
          { formState == 7 && 
            <div className="text-center text-xl pb-4 text-red mb-4">
              PLEASE REVIEW YOUR INFORMATION BEFORE SUBMITTING
            </div>
          }
        <div className="form_step" id="section-1">
          { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 1</h2>
                <h3>Create an App</h3>
            </div>
            }
            <div className="form_step_content">
                <div className="form_step_content_input">
                    <input          
                    type="text"
                    placeholder="App Name"
                    
                    ref={appName}
                  />
                </div>
                <div className="form_step_content_input">
                    <input
                    type="url"  
                    placeholder="Website Url Eg. http://mycoolapp.com"
                    

                    ref={url}
                  />
                </div>
                <div className="form_step_content_input">
                <div className="containerr">
                    <ul className="ks-cboxtags">
                      <p className="text-center text-xl font-bold">Select Platform</p>
                      <li><input type="checkbox" id="androidApp" value="android" onChange={platformChoose} defaultChecked /><label htmlFor="androidApp">Android</label></li>
                      <li><input type="checkbox" id="iOSApp" value="ioss"  onChange={platformChoose} disabled /><label htmlFor="iOSApp">iOS (not available)</label></li>
                    </ul>
                  </div>
                </div>
                <div className="form_step_content_input img_input py-4">
                    <label htmlFor="icon" className="custom-file-upload" id="icon-label" style={{background:"url('plus-sign.png') no-repeat center;", backgroundSize: 'contain'}}>
                        <i className="fa fa-cloud-upload"></i> Select Icon
                    </label>
                    <input
                    type="file"
                    className="input-file"
                    onChange={readIcon}
                    id="icon"
                    accept="image/png"
                    ref={icon}
                    
                  />
                  <div className="image_help px-4">
                      
                      <ul>
                            <li>
                                <i className="fa fa-check"></i>
                                <span>PNG</span>
                            </li>
                            <li>
                                <i className="fa fa-check"></i>
                                <span>128x128</span>
                            </li>
                            <li>
                                <i className="fa fa-check"></i>
                                <span>Less than 2MB</span>
                            </li>
                            <li>
                                <i className="fa fa-check"></i>
                                <span>Make Sure it is padded </span>
                            </li>
                      </ul>
                  </div>
                </div>
            </div>
        </div>

        <div className="form_step" id="section-2" style={{display:'none'}}>
        { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 2</h2>
                <h3>Meta Information</h3>
            </div>
}
            <div className="form_step_content">
                <div className="form_step_content_input">
                    <input
                        type="text"
                        
                        placeholder="Package / Bundle ID"
                        

                        ref={package_name}
                    />
                    <small>Eg. com.company.app</small>
                </div>

                <div className="form_step_content_input img_input">
                    <img width="80px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSXdMO7E_eJjNN_mRpjjT-MBrNB8mSr-H6hA&usqp=CAU" alt=""/>
                  <div className="image_help">
                      <blockquote>
                          What is bundle ID / Package ID
                      </blockquote>
                      <div style={{paddingLeft:"40px"}}>
                      
                        This is a string specified during development, often in the form of com.your-company.app-name, or sometimes as a GUID. This string, the package name, is located in the name attribute of the Identity element in your app’s manifest file.
                        <br/>
                        Learn more at
                        <a style={{textDecoration: 'none'}} href="https://support.google.com/admob/answer/9972781?hl=en#:~:text=The%20package%20name%20of%20an,supported%20third%2Dparty%20Android%20stores." target="_blank" rel="noreferrer">Google</a>
                        </div>
                  </div>
                </div>

            </div>
        </div>

        <div className="form_step" id="section-3" style={{display:'none'}}>
        { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 3</h2>
                <h3>Splash Screen</h3>
            </div>
}
            <div className="form_step_content">
                <div className="form_step_content_input">
                    <div>
                      

                        <label className="rad-label" >
                          <input type="radio" className="rad-input" value="still" name="splashScreen" onChange={splashScreenNone}/>
                          <div className="rad-design"></div>
                          <div className="rad-text">No animation Splash Screen</div>
                        </label>
                      
                        <label className="rad-label">
                          <input type="radio" className="rad-input" value="fade" name="splashScreen" onChange={splashScreenFade} defaultChecked />
                          <div className="rad-design"></div>
                          <div className="rad-text">Simple Fade in / Out Splash </div>
                        </label>
                      
                        <label className="rad-label">
                          <input type="radio" className="rad-input" value="zoom" name="splashScreen" onChange={splashScreenZoom}/>
                          <div className="rad-design"></div>
                          <div className="rad-text">Zoom in Transition</div>
                        </label>
                      
                      </div>
                </div>
            </div>
        </div>

        <div className="form_step" id="section-4" style={{display:'none'}}>
        { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 4</h2>
                <h3>Features</h3>
            </div>
}
            <div className="form_step_content">
                <div className="containerr">
                    <ul className="ks-cboxtags">
                      <li><input type="checkbox" id="admobCheck" value="admob" onChange={doss} ref={admob}/><label htmlFor="admobCheck">Admob (coming soon)</label></li>
                      <li><input type="checkbox" id="firebaseCheck" value="firebasePush"  onChange={doss} ref={pushNoti} /><label htmlFor="firebaseCheck">Firebase Push Notification Service (coming soon)</label></li>
                    </ul>
                  </div>


                <div className="form_step_content" id="google_service" style={{display:'none'}}>
                  <div className="form_step_content_input">
                      <input
                      type="text"
                      className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Admob ID : ca-app-pub-3940256099942544~3347511713"
                      ref={admob_id}
                    />
                  </div>
                  <div className="form_step_content_input">
                      <input
                      type="text"
                      className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Banner ad ID : ca-app-pub-3940256099942544/6300978111"
                      ref={banner_id}
                    />
                  </div>
                  <div>
                      <div className="form_step_content_input iosInputs" style={{display: 'none'}}>
                          <div className="form_step_content_input_file">
                              <label htmlFor="GoogleServiceFile" id="GoogleServiceFileLabel" className="inputSelector">
                                  <i className="fa fa-cloud-upload"></i> Attach GoogleService-Info.plist
                              </label>
                              <input
                              type="file"
                              className="input-file"
                              onChange={readGoogleService}
                              id="GoogleServiceFile"
                              accept=".plist"
                              ref={GSFile}
                          />
                          </div>
                          <div className="form_step_content_input_file">
                              <label htmlFor="GoogleServiceFile" id="GoogleServiceFileLabelAndroid" className="inputSelector">
                                  <i className="fa fa-cloud-upload"></i> Attach GoogleService-Info.Json
                              </label>
                              <input
                              type="file"
                              className="input-file"
                              onChange={readGoogleServiceAndroid}
                              id="GoogleServiceFileAndroid"
                              accept=".plist"
                              ref={GSFileAndroid}
                          />
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        <div className="form_step" id="section-5" style={{display:'none'}}>
        { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 5</h2>
                <h3>Color Schemes</h3>
            </div>
}
            <div className="form_step_content">
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
            </div>
        </div>

        <div className="form_step" id="section-6" style={{display:'none'}}>
        { formState != 7 && 
            <div className="form_step_title">
                <h2>Step 6</h2>
                <h3>Keystore</h3>
            </div>
}
            <div className="form_step_content">
                <div className="form_step_content_input img_input">
                    <img width="80px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSXdMO7E_eJjNN_mRpjjT-MBrNB8mSr-H6hA&usqp=CAU" alt=""/>
                  <div className="image_help">
                      <blockquote>
                          What is Keystore?
                      </blockquote>
                      <div style={{paddingLeft:"40px"}}>
                      
                        The Android Keystore system lets you store cryptographic keys in a container to make it more difficult to extract from the device. Once keys are in the keystore, they can be used htmlFor cryptographic operations with the key material remaining non-exportable. Moreover, it offers facilities to restrict when and how keys can be used, such as requiring user authentication htmlFor key use or restricting keys to be used only in certain cryptographic modes. See Security Features section htmlFor more information.
                        <br/>
                        Learn more at
                        <a style={{textDecoration:"none"}} href="https://developer.android.com/training/articles/keystore#:~:text=The%20Android%20Keystore%20system%20lets,key%20material%20remaining%20non%2Dexportable." target="_blank" rel="noreferrer">Google</a>
                        </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-bold android_inputs">Android Setting</p>
                <div className="form_step_content_input android_inputs">
                
                    <div>

                        <label className="rad-label">
                          <input type="radio" className="rad-input" name="keystoreRadio" onChange={newKeystore} defaultChecked/>
                          <div className="rad-design"></div>
                          <div className="rad-text">I do not have a keystore, Create New (For Android)</div>
                        </label>
                      
                        <label className="rad-label">
                          <input type="radio" className="rad-input" onChange={haveKeystore} name="keystoreRadio"/>
                          <div className="rad-design"></div>
                          <div className="rad-text">I have a keystore (For Android)</div>
                        </label>

                        <label className="rad-label">
                            <input type="radio" className="rad-input" onChange={unsignedKeystore} name="keystoreRadio"/>
                            <div className="rad-design"></div>
                            <div className="rad-text">I will sign it myself, give me unsigned App (For Android) </div>
                          </label>
                      </div>
                </div>
                <div id="haveKeystore" style={{display:'none'}}>
                  
                    <div className="form_step_content_input android_inputs">
                        <div className="form_step_content_input_file">
                            <label htmlFor="keystoreFile" id="keystoreFileLabel" className="inputSelector">
                                <i className="fa fa-cloud-upload"></i> Select Keystore
                            </label>
                            <input
                            type="file"
                            className="input-file"
                            onChange={readKeystore}
                            id="keystoreFile"
                            accept="application/vnd.android.package-archive"
                            ref={keystore}
                            
                        />
                        
                        </div>

                        <div className="form_step_content_input">
                            <input
                            type="text"
                            className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Your Keystore Password"
                            
                            minLength={6}

                            ref={keystorePassword2}
                          />
                          <small className="text-bold font-bold">
                            <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
                              A valid password can contain 6 to 30 characters, begin with an alphabetic character, and use only alphanumeric characters.
                          </small>
                        </div>
                    </div>
                </div>
                
                <div id="newKeystore" >
                    <div className="form_step_content_input android_inputs">
                        <input
                            type="text"
                            className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="You First And Last Name"
                            ref={Name}
                            
                        />
                    </div>
                    <div className="form_step_content_input android_inputs">
                        <input
                            type="text"
                            className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Your Organization"
                            

                            ref={Organization}
                        />
                    </div>
                    <div className="form_step_content_input android_inputs">
                        <input
                            type="text"
                            className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Key Alias"
                            defaultValue={"alias"}
                            

                            ref={keyAlias}
                        />
                    </div>
                    <div className="form_step_content_input android_inputs">
                        <input
                        type="text"
                        className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Create A Keystore Password"
                        
                        minLength={7}

                        ref={keystorePassword}
                      />
                      <small className="text-bold font-bold">
                        <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 font-white text-white text-xs font-bold mr-3">Note</span>
                          A valid password can contain 6 to 30 characters, begin with an alphabetic character, and use only alphanumeric characters.
                      </small>
                    </div>
                    
                    
                </div>

                <div id="unsignedKeystore" style={{display:'none'}}>
                  
                </div>

                <div className="iosInputs" style={{display:'none'}}>
                  <p className="text-gray-600 text-sm font-bold">iOS Setting</p>
                  <div className="form_step_content_input">
                          <div className="form_step_content_input_file">
                              <label htmlFor="certificateFile" id="certificateFileLabel" className="inputSelector">
                                  <i className="fa fa-cloud-upload"></i> Choose Signing Certificate
                              </label>
                              <input
                              type="file"
                              className="input-file"
                              onChange={readCert}
                              id="certificateFile"
                              ref={certificate}
                              
                          />
                          
                          </div>

                          <div className="form_step_content_input_file my-8">
                              <label htmlFor="ppFile" id="ppFileLabel" className="inputSelector">
                                  <i className="fa fa-cloud-upload"></i> Select Provisioning Profile
                              </label>
                              <input
                              type="file"
                              className="input-file"
                              onChange={readPP}
                              id="ppFile"
                              ref={provisioningProfile}
                              
                          />
                          
                          </div>

                          <div className="form_step_content_input my-8">
                              <input
                              type="text"
                              className="customBorder px-3 py-3 placeholder-gray text-blueGray bg-white rounded text-sm shadow-md focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Your Password"                              
                              minLength={7}
                              ref={keyPassword}
                            />
                          </div>
                      </div>
                </div>

            
        </div>        
        </div>


        <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />
        <div className="text-center mt-6 grid grid-cols-1 " id="submit_button" style={{display:'none'}}>

          <button
            className="btn-custom text-white p-3 text-lg"
            type="button"
            onClick={onSubmit}
            
          >
            Create App
          </button>
          
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300 mb-8" />

        <div className="flex justify-around">
          { formState > 1 && 
          <button onClick={formStepBackward} className="btn-custom p-4 " type="button" style={{'background':'linear-gradient(0deg, #4e0a27, rgb(171 12 61))'}}>
            Prev
          </button>
          }
          { formState < 7 &&
          <button onClick={formStepForward} className="btn-custom p-4 " type="button" style={{'background':'linear-gradient(0deg, #4e0a27, rgb(171 12 61))'}}>
            Next
          </button>
          }
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


