import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";


const VerifyEmail = ({ props }) => {


  return (
    <>
    <div className="max-w-screen-xl  mx-auto w-full mb-20">
      <div className="  mx-4 overflow-x-hidden bg-white rounded-md">
        <div className="text-center mb-40 mt-40 text-xl font-bold animate-bounce">
            Verify Your Email First Please!<br></br>
            A verification email has been sent you your email!
        </div>
      </div>
    </div>
    </>
  );
};

export default VerifyEmail;
