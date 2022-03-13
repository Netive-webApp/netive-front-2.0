import React from 'react'

const StatCard = (props) => {
  return (
    <>
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray uppercase font-bold text-xs">
                {props.statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {props.statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  props.statIconColor
                }
              >
                <i className={props.statIconName}></i>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    
    </>
  )
}

export default StatCard