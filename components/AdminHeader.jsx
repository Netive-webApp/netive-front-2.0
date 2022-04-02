import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";


const AdminHeader = ({ props }) => {
  
  var data = props.data;

  try {
    var build = data[0]["build"];
    var failed = data[0]["failed"];
    var ready = data[0]["ready"];
    var pending = data[0]["pending"];
    var username = data[0]["username"];
    var email_verified = data[0]["email_confirmed"];
  } catch {
    //PASS
  }

  return (
    <>
      <div className="pb-48 " style={{marginBottom: "-8rem"}}>
        <div className="max-w-screen-xl mx-auto">

          <div className="pt-14">
            
            { email_verified && 
            <Link href="/createApp" className="m-2">
              <button className="py-2 px-3 btn-custom text-blueGray font-bold ml-4 inline rounded-sm text-sm ">
                <span className="mx-2">
                  <i class="fa-solid fa-plus"></i>
                </span>
                Create New App
              </button>
            </Link>}
      
            <Link href="/">
              <button className="py-2 px-3 btn-custom text-blueGray font-bold ml-4 inline rounded-sm text-sm">
                <span className="mx-2">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                Dashboard
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
