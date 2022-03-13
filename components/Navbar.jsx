import React from "react";
import Image from "next/image";
import { userService } from "../services/user.service";

const Navbar = () => {
  return (
    < div className="shadow">
      <div className="flex flex-row justify-between items-center max-w-screen-xl mx-auto ">
        <div className="ml-4">
          <Image src={`/logo.png`} width={70} height={70}  />
        </div>

        <div className="mr-4">
        <button className="px-4 py-2 bg-blueGray text-white" onClick={userService.logout}>
          LOG OUT
        </button>
        </div>
      </div>
    </ div >
  );
};

export default Navbar;
