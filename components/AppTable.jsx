import React from "react";
import { useEffect } from "react/cjs/react.production.min";
import { userService } from "../services/user.service";

const AppTable = ({ props }) => {
  
  var data = userService.getApps(props[0].cookie);
  console.log(data);



  return (
    <div className="max-w-screen-xl  mx-auto w-full">
      
      <div className="  mx-4 overflow-x-hidden bg-white rounded-md">
        
        
        <div className="container mx-auto flex w-full justify-between		">
        <h1 className="mx-2 text-blueGray-700 text-Left text-4xl font-light my-6 hover:underline">#Your Apps</h1>
              <button className="px-4 py-2 text-dark"  onClick={props[1]} >
                
                <span className="px-2 py-2 rounded-full border-2 ">
                <i className="fa fa-refresh hover:animate-spin" aria-hidden="true"></i>
                </span>
              </button>
            </div>
        <div className="overflow-x-scroll">
          <table className=" overflow-x-auto  w-full bg-white">
            <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                INDEX
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                APP NAME
              </th>

              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                STATUS
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                PLATEFORM
              </th>
            </tr>
            </thead>
            {/* use list renderinf here */}

            <tbody>
              {data?.map((app, index) => (
                <tr key={app.id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  font-bold whitespace-nowrap p-4">
                    {index + 1}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {" "}
                    <img
                      src={app.icon}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                    <span className={"ml-3 font-bold"}>{app.appName}</span>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                   {app.status=="ready" ? (
                      <>
                      
                      <a className="py-2 downloadButton font-bold ml-4 inline rounded-sm text-sm" href={app.appZip} download>
                      .apk
                      <span className="px-2"><i className="fa-solid fa-download"></i></span>
                      </a>
                      
                      {(app.platform == 'both' || app.platform == 'ios') &&
                          <a className="py-2 downloadButton font-bold ml-4 inline rounded-sm text-sm"href={app.iosAppZip} download>
                            .ipa
                            <span className="px-2"><i className="fa-solid fa-download"></i></span>
                          </a>
                       }
                      </>
                      
                   ) : (
                    app.status.toUpperCase()
                   )}
                 
                   
                  </td>
                  <td className="border-t-0 px-6 align-middle font-bold border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  
                    { app.platform != 'both' &&
                    <>
                      <span className="px-2">
                      {" "}
                      <img
                        src="android.png"
                        className="h-6 w-6 bg-white rounded-full "
                        alt="..."
                      ></img>
                        </span>
                    </>
                    }
                    { app.platform == 'both' &&
                    <>
                      <span className="px-2">
                      {" "}
                      <img
                        src="plus-sign.png"
                        className="h-6 w-6 bg-white rounded-full "
                        alt="..."
                      ></img>
                        </span>
                    </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppTable;
