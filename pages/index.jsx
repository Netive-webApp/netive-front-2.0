
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import { useRouter } from "next/router";
import { userService } from "../services/user.service";
import VerifyEmail from "../components/VerifyEmail";




export default function Home(props) {
  var router = useRouter();
  
  
  
  if (!props.isAuthenticated && typeof window !== "undefined" && router.pathname !== "/auth/register") {
    router.push('auth/login');
  } else {
    var data = userService.getDashboardData(props.cookie);
    console.log(email_verified);
    
    try {
      var email_verified = data[0]['email_confirmed'];
    } catch {
      var email_verified = false;
      //PASS;
    }
  }
  var childProps = {
    props,
    data
  }

  return (
    <div className="">
     
        <>
          <Navbar />
          <AdminHeader props={childProps}/>
          {email_verified &&
          <AppTable props={props} />
          }
          {!email_verified &&
          <VerifyEmail props={props}/>
          }
          
          
        </>
      
    </div>
  );
}
