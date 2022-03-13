import Head from "next/head";
import Image from "next/image";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import styles from "../styles/Home.module.css";
import Login from "../components/login";
import { useState } from "react";
import userService from "../services/user.service"
import {customHelpers} from "../helpers/custom-helpers"

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = { // error aler optional configuration   
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function Home() {
  var [isAuthenticated, cookie] = customHelpers.checkAuth(true);

  var props = {
    isAuthenticated,
    cookie
  }
  
  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <div className="">
      {isAuthenticated ? (
           <>
           <Navbar />
           <AdminHeader props = {props}/>
           <AppTable props = {props}/>
         </>
       
      ) : (
        <>
        <Login />
      

        </>
      )}

    </div>
    </AlertProvider>
  );
}
