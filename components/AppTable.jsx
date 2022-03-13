import React from "react";

const AppTable = () => {
  return (
    <div className="max-w-screen-xl  mx-auto w-full bg-transparent px-4 overflow-x-scroll">
      <table className=" overflow-x-auto  w-full bg-white">
        <tr>
          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">INDEX</th>
          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">APP NAME</th>
          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">CREATED AT</th>
          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">STATUS</th>
          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">PLATEFORM</th>
        </tr>
 {/* use list renderinf here */}
        <tr>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">1</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"> <img src={''}className="h-12 w-12 bg-white rounded-full border"alt="..."></img>{" "}
          <span className={"ml-3 font-bold"}>appName</span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">30/05/2002 11:55 AM</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">DOWNLOAD</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">ANDROID/IOS</td>
        </tr>
        
      </table>
    </div>
  );
};

export default AppTable;
