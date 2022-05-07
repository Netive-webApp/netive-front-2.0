import React from "react";
import Image from "next/image";
import { userService } from "../services/user.service";

const Navbar = ({props}) => {
  
  try{
    if (props.length > 1){
      var show = props[1];
    } else {
      var show = 'none';
    }
    var username = props[0][0]['username'];
    
  } catch (error) {
    //console.log(error);
    var username = "";
  }
  function toggleNavbar() {
    var navbar = document.getElementsByClassName("sidebar")[0];
    var sd_button = document.getElementsByClassName("sidebar-button")[0];
    if (navbar.className === "sidebar") {
      navbar.className += " show";
      sd_button.className += " text-white";
    } else {
      navbar.className = "sidebar";
      sd_button.className = "sidebar-button px-2 mx-2 ";
    }
  }

    
  return (
    <div className="shadow bg-white pt-4 pb-4" style={{'display':show}}>
      <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto ">
      
        <div className="ml-4 flex flex-row items-center font-oc">
          <button className="sidebar-button px-2 mx-2 " onClick={toggleNavbar}>
            <i className="fa-solid fa-bars"></i>
          </button>
          {username}
          
        </div>

        <div className="mr-4 ">
          
        <button className="px-4 py-2 text-dark" onClick={userService.logout}>
          <span className="px-2 ">
            <Image
              src="/logout.png"
              width={25}
              height={25}
              />
          </span>
        </button>
        </div>
      </div>
    </ div >
  );
};

export default Navbar;
