import React from "react";
import Link from "next/link";
import StatCard from "./StatCard";
import AppTable from "./AppTable";

const AdminHeader = () => {
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
                statTitle="8"
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle="8"
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle="8"
                statIconName="far fa-chart-bar"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <StatCard
                statSubtitle="TOTAL BUILDS"
                statTitle="8"
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
