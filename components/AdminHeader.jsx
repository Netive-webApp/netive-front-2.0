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
      <div className="pb-40 " style={{marginBottom: "-8rem"}}>
        
        <div className="max-w-screen-xl mx-auto">
        

          <div className="flex flex-wrap mt-14 justify-between">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle={build}
                statIconName="fa-solid fa-wrench"
                statIconColor="red-grad"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Ready"
                statTitle={ready}
                statIconName="fa-solid fa-circle-check"
                statIconColor="red-grad"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Failed"
                statTitle={failed}
                statIconName="fa-solid fa-circle-exclamation"
                statIconColor="red-grad"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="Pending"
                statTitle={pending}
                statIconName="fa-solid fa-hourglass"
                statIconColor="red-grad"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
