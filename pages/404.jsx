import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Custom404(props) {
  return (
      <>
      <Navbar props={props}/>
    <div className="not-found flex">
        <div className="" style={{"marginTop": "20rem"}}>
            
        <img
            src="https://www.heartwoodmaltwhisky.com.au/wp-content/uploads/200.gif"
            className="w-full h-40 w-40"
            
            />
            <p className="text-center text-xl font-bold py-4 my-4 animate-bounce">
                404 NOT FOUND
            </p>
            </div>
    </div>
    </> 
  );
};
