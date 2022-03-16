
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import { useRouter } from "next/router";




export default function Home(props) {
  var router = useRouter();
  
  if (!props.isAuthenticated && typeof window !== "undefined" && router.pathname !== "/auth/register") {
    router.push('auth/login');
  }

  return (
    <div className="">
     
        <>
          <Navbar />
          <AdminHeader props={props} />
          <AppTable props={props} />
        </>
      
    </div>
  );
}
