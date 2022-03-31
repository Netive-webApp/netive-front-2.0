import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";


const Footer = ({props}) => {
  

  return (
    <>
    <footer className="text-center bg-gray-900 text-white mt-8">

        <div className="text-center p-4">
            Made with love ❤️ @  
            <a className="text-whitehite" href="https://tailwind-elements.com/"> Netive </a>
        </div>
    </footer>
    </>
  );
};

export default Footer;
