import Head from "next/head";
import Image from "next/image";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import styles from "../styles/Home.module.css";
import Login from "../components/login";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);
  return (
    <div className="">
      {login ? (
           <>
           <Navbar />
           <AdminHeader />
           <AppTable />
         </>
       
      ) : (
        <>
        <Login />
      <button onClick={() => {setLogin(true)}}>SIGN IN</button>

        </>
      )}

    </div>
  );
}
