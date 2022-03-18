
import { userService } from "../../../services/user.service";
import { customHelpers } from "../../../helpers/custom-helpers";
import { useAlert } from 'react-alert';
import { useRouter } from "next/router";

var checkAuth = customHelpers.checkAuth;
var fixAuth = customHelpers.fixAuth;
var validateToken = userService.validateToken;


export default function TokenVerification() {
    const router = useRouter();
    var [isAuthenticated, cookie] = checkAuth(router, '/admin/dashboard', true); //automatically check if cookie exists and route authStatus matches the condition
    try{
        if (!isAuthenticated){
        var token = router.pathname('?')[1].split("=")[0]

        try{
            var {data, valid} = userService.validateToken(token)
            console.log(valid)
            if (valid){
                userService.socialLogin(token, router);
            }
        } catch (err){
            console.log(err);
            console.log("Token Validation: ERROR");

        }
            

    } else{
        if (typeof window != 'undefined'){
            console.log(err);
            router.push('/');
        }
    }
} catch (err){
        if (typeof window != 'undefined'){
            console.log(err);
            router.push('/');
        }
    }



  return (
      <div>hi</div>
  );
}
