import React from "react";
import Image from "next/image";
import { userService } from "../services/user.service";

const Navbar = () => {
  return (
    < div className="shadow bg-white pt-4 pb-4">
      <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto ">
        <div className="ml-4 flex flex-row items-center">
          <Image src={`/netive-icon.png`} width={40} height={40}  />
          
        </div>

        <div className="mr-4 ">
          
        <button className="px-4 py-2 text-dark hover:shadow" onClick={userService.logout}>
          Log Out<span className="px-2 "><i className="fa-solid fa-arrow-right-from-bracket"></i></span>
        </button>
        </div>
      </div>
    </ div >
  );
};

export default Navbar;
