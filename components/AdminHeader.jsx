import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";
import { userService } from "../services/user.service";

const AdminHeader = ({ props }) => {
  
  var data = userService.getDashboardData(props.cookie);
  try {
    var build = data[0]["build"];
    var failed = data[0]["failed"];
    var ready = data[0]["ready"];
    var pending = data[0]["pending"];
  } catch {
    //PASS
  }

  return (
    <>
      <div className="bg-blueGray pb-48 " style={{marginBottom: "-8rem"}}>
        <div className="max-w-screen-xl mx-auto">
          <div className="pt-14">
            <Link href="/createApp" className="m-2">
              <button className="py-2 px-3 bg-white text-blueGray font-bold ml-4 inline rounded-sm text-sm ">
                CREATE NEW APP
              </button>
            </Link>
      
            <Link href="/">
              <button className="py-2 px-3 bg-white text-blueGray font-bold ml-4 inline rounded-sm text-sm">
                DASHBOARD
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap mt-14 justify-between">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle={build}
                statIconName="fa-solid fa-wrench"
                statIconColor="bg-blue-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Ready"
                statTitle={ready}
                statIconName="fa-solid fa-circle-check"
                statIconColor="bg-green-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Failed"
                statTitle={failed}
                statIconName="fa-solid fa-circle-exclamation"
                statIconColor="bg-red-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Pending"
                statTitle={pending}
                statIconName="fa-solid fa-hourglass"
                statIconColor="bg-yellow-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
