import React from "react";
import Image from "next/image";
import { userService } from "../services/user.service";
import Link from "next/link";

const Sidebar = ({props}) => {
    try{
        
        var isAuthenticated = props;
        
        
      } catch {
        var isAuthenticated = false;
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
      <>
    <div className="sidebar">
        
        <div className="sidebar-header">
            <span>Netive</span>
            
            
        </div>
        <div className="sidebar-body">
            { isAuthenticated &&
            <div>
            <div className="sidebar-link">
                <Link href="/">
                <a href="#" onClick={toggleNavbar}>Dashboard</a>
                </Link>
            </div>
            <div className="sidebar-link">
                <Link href="/createApp#create-app-form">
                <a href="#" onClick={toggleNavbar}>New App</a>
                </Link>
            </div>
            <div className="sidebar-link">
                <a href="#" onClick={toggleNavbar}>Billing</a>
            </div>
            </div>
            }
             { !isAuthenticated &&
             <div>
                <div className="sidebar-link">
                    <Link href="/auth/login">
                        <a href="#" onClick={toggleNavbar}>Login</a>
                    </Link>
                </div>
                <div className="sidebar-link">
                    <Link href="/auth/register">
                        <a href="#" onClick={toggleNavbar}>Register</a>
                    </Link>
                </div>
            </div>
             }

            <div className="sidebar-link">
                <a href="https://netive.tech/docs" target="_blank" onClick={toggleNavbar}>Docs</a>
            </div>
            <div className="sidebar-link">
                <a href="mailto:team@netive.tech" onClick={toggleNavbar}>Support</a>
            </div>
        </div>
        <div className="text-gray-400">
            v0.2B <br/> CacaoBerry
        </div>
    </div>
    </>
  );
};

export default Sidebar;
