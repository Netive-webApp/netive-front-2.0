
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import AppTable from "../components/AppTable";




export default function Home(props) {
  // var [isAuthenticated, cookie] = customHelpers.checkAuth(true);

  // var props = {
  //   isAuthenticated,
  //   cookie,
  // };

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
