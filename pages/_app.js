import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import styles from "../styles/Home.module.css";
import Login from "../components/login";
import { useState } from "react";
import userService from "../services/user.service";
import { customHelpers } from "../helpers/custom-helpers";




import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  
  // error aler optional configuration
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
function MyApp({ Component, pageProps }) {

  var [isAuthenticated, cookie] = customHelpers.checkAuth(true);

  var pageProps = {
    isAuthenticated,
    cookie,
  };


  return (
    <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </Head>
      
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps}  />
      </AlertProvider>
    </>
  );
}

export default MyApp;
