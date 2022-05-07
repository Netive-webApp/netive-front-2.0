import React from "react";
import Link from "next/link";
import Login from "../../components/login";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar"; 

export default function LoginPage(props) {
  var router = useRouter();
  if (props.isAuthenticated) {
    router.push("/");
    
  }
  return (
    <>
      <Navbar props={[props, 'none']}/>
      <div className="login-form">
        
        <Login/>
      </div>
    </>
  );
};
