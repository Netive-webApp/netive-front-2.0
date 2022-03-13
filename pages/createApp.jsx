// return a simple form

import { createRef, useRef } from "react";
// import { userService } from "services/user.service.js";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/router";

export default function NewAppForm({props}){
  const router = useRouter();
  var appName = createRef();
  var url = createRef();
  var icon = createRef()
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
  

  // form validation rules 
  const validationSchema = Yup.object().shape({
    appName: Yup.string()
        .required('First Name is required'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, formState } = useForm(formOptions);
    
    function onSubmit() {
          let form_data = new FormData();
          form_data.append('image', document.getElementById("icon").files[0]);
          form_data.append('appName', appName.current.value);
          form_data.append('url', url.current.value);
          form_data.append('package_name', package_name.current.value);
          form_data.append('primaryColor', primaryColor.current.value);
          form_data.append('primaryColorDark', primaryColorDark.current.value);
          form_data.append('colorAccent', colorAccent.current.value);
          form_data.append('keystoreName', keystoreName.current.value);
          form_data.append('Name', Name.current.value);
          form_data.append('OrganizationUnit', OrganizationUnit.current.value);
          form_data.append('Organization', Organization.current.value);
          form_data.append('City', City.current.value);
          form_data.append('State', State.current.value);
          form_data.append('CountryCode', CountryCode.current.value);
          form_data.append('keystorePassword', keystorePassword.current.value);
          form_data.append('keyAlias', keyAlias.current.value);
          form_data.append('keyPassword', keyPassword.current.value);
          
          
          const headers = {
            'Authorization': `Token ${props['cookie']}`,
          }
          
          
          
          axios.post("https://netive-backend.herokuapp.com/api-info/register/app/", form_data, {headers:headers}).then(console.log('APP REGISTERED'));

          router.push('/admin/tables');

              
      }


    
      function readIcon(){
        icon = document.getElementById("icon").files[0];

        document.getElementById("icon_prev").setAttribute("src", URL.createObjectURL(icon));
      }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="block uppercase text-blueGray-600 text-lg font-bold mb-2">Basic Information</h1>
        <div className="relative w-full mb-3">
          <label
            className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            App Name
          </label>
          <input
            type="text"
            className=" customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="My Cool App"
            required
            ref={appName}
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            
          >
            Website URL
          </label>
          <input
            type="url"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="http://mycoolapp.com"
            required
            ref={url}
           
          />
        </div>
        <div className="grid grid-cols-2 py-4 mt-8 mb-8 md:grid-cols-1">
          <div className="relative w-full">
            <label
              className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
              
            >
              App Icon 
            </label>
            <input
              type="file"
              className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={readIcon}
              id="icon"
              accept="image/png"
              ref={icon}
              required
            />
            <small>
              Note: Please Make Sure it is a PNG file and dimensions are rectangular, eg. 512x512
            </small>
          </div>
          <div className="app-icon-holder">
            <img
            className="app-icon-display"
            id="icon_prev"
            required
            />
          </div>
        </div>
        
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            
          >
            Package Name
          </label>
          <input
            type="text"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="com.mycoolapp.app"
            ref={package_name}
            
            
          />
        </div>

        <hr className=" border-b-1 border-blueGray-300 mt-8 mb-8" />
        <h1 className="block uppercase text-blueGray-600 text-lg font-bold mb-2">Color Scheme</h1>

        <div className="grid grid-cols-2 py-4 mt-8 mb-8 md:grid-cols-1">
          <div className="relative w-full px-6">
            <label
              className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
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
          <div className="relative w-full px-6">
            <label
              className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
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
          <div className="relative w-full px-6">
            <label
              className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
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
        <h1 className="block uppercase text-blueGray-600 text-lg font-bold mb-8">Keystore Information</h1>
        <small>Note: Currently we only support creating new keystore per app, later we'll support premade keystores</small>
        <div className="relative w-full mb-3">
          <label
            className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            

          >
            Keystore Name
          </label>
          <input
            type="text"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="My keystore"
            required
            ref={keystoreName}

          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="required block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            
          >
            Name
          </label>
          <input
            type="text"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="John Doe"
            ref={Name}
            required
            
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            
          >
            Organizational Unit
          </label>
          <input
            type="text"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Unit"
            ref={OrganizationUnit}
            
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
            
          >
            Organization
          </label>
          <input
            type="text"
            className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="My Company"
            ref={Organization}
          />
        </div>
        <div className="grid grid-cols-2 py-4 mt-8 mb-8 md:grid-cols-1">
          <div className="relative w-full mb-3 px-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              City
            </label>
            <input
              type="text"
              className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="City"
              ref={City}
              
            />
          </div>
          <div className="relative w-full mb-3 px-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              State
            </label>
            <input
              type="text"
              className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="State"
              ref={State}
              
            />
          </div>
          <div className="relative w-full mb-3 px-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Country Code
            </label>
            <input
              type="text"
              className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="eg. US"
              ref={CountryCode}
              
            />
          </div>
          <div className="relative w-full mb-3 px-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Alias
            </label>
            <input
              type="text"
              className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Key Alias"
              ref={keyAlias}
            />
          </div>
        </div>
        
        
        <div className="grid grid-cols-2 py-4 mt-8 mb-8 md:grid-cols-1">
          <div className="relative w-full mb-3 px-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Keystore Password
              </label>
              <input
                type="text"
                className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Keystore Password"
                ref={keystorePassword}
              />
          </div>
          <div className="relative w-full mb-3 px-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Key Password
              </label>
              <input
                type="text"
                className="customBorder px-3 py-3 placeholder-gray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Key Password"
                ref={keyPassword}
              />
          </div>
          <small>
            We do not store these credentials, they are only used to generate the keystore
            Please keep them somewhere safe and secure.
          </small>
        </div>
        

        

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox customBorder rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-blueGray-600">
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

        <div className="text-center mt-6">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            onClick={onSubmit}
          >
            Create App
          </button>
        </div>
      </form>
    )
    
    
}
