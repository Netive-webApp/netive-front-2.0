import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";
import { userService } from "../services/user.service";


const AdminHeader = ({props}) => {
  var [build, failed, ready, pending] = [0, 0, 0, 0];
  var data = userService.getDashboardData(props.cookie);
  try{
    build = data[0]['build'];
    failed = data[0]['failed'];
    ready = data[0]['ready'];
    pending = data[0]['pending'];
  } catch{
    //PASS
  }
  
  
  return (
    <>
      <div className="bg-blueGray pb-48 ">
        <div className="max-w-screen-xl mx-auto">
          <div className="pt-14">
            <button className="py-3 px-4 bg-white text-blueGray font-bold ml-4 inline">
              <Link href="/createApp"> 
              
              CREATE NEW APP
              
              </Link>
            </button>
          </div>

          <div className="flex flex-wrap mt-14 justify-between">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle={build}
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Ready"
                statTitle={ready}
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Failed"
                statTitle={failed}
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Pending"
                statTitle={pending}
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default AdminHeader;
