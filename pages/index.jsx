
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";
import { useRouter } from "next/router";
import { userService } from "../services/user.service";
import VerifyEmail from "../components/VerifyEmail";





export default function Home(props) {
  var router = useRouter();
  var haventRecievedData = true;
  
  
  
  if (!props.isAuthenticated && typeof window !== "undefined" && router.pathname !== "/auth/register") {
    router.push('auth/login');
  } else {
    var data = userService.getDashboardData(props.cookie);
    console.log(email_verified);
    
    try {
      var email_verified = data[0]['email_confirmed'];
      haventRecievedData = false;
    } catch {
      var email_verified = false;
      haventRecievedData = true;
      //PASS;
    }
  }
  
  var childProps = {
    props,
    data
  }

  function refreshPage(){
    router.reload();
  }


  return (
    <div className="">
     
        <>
            <Navbar props={[data, 'block']}/>
            <AdminHeader props={childProps}/>

            { haventRecievedData && 
              <div className="loader">
                <img src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-28.jpg" className="w-full h-10 w-10" />
              </div>
            }

            
            {email_verified && !haventRecievedData && 
            <AppTable props={[props, refreshPage]} />
            }

            {!email_verified && !haventRecievedData && 
            <VerifyEmail props={props}/>
            }
        </>
      
    </div>
  );
}
