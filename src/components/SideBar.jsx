import React, { useState, useEffect } from "react";
import dashlogo from "../assets/dashlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { ArrowBack, Close } from "@mui/icons-material";
import { swipLeft } from "../utils/adminDashboardSlice/adminDashboardSlice";
import Data from "../utils/CompontStaticData";
import { Outlet, NavLink } from "react-router-dom";
const SideBar = ({ isNotificationOpen, showUserPanel, setShowUserPanel, setIsNotificationOpen }) => {
  const navigate = useNavigate()
  let currentlocation = useLocation().pathname.substring(useLocation().pathname.lastIndexOf("/") + 1)
  const [adminSidebar, setAdminSidebar] = useState(Data?.Data?.adminSidebarItems)
  const [driverSidebar, setDriverSidebar] = useState(Data?.DriverData?.driverSidebarItems)
  const [sellerSideBar, setSellerSideBar] = useState(Data?.sellerData.sellerSidebarItems)
  const { toggleMenu } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [downArrows, setDownArrows] = useState(false);
  const user = localStorage.getItem("typeOfUser");
  useEffect(() => {
    if (user === "SuperAdmin") {
      const updatedItems = adminSidebar.map(items =>
        currentlocation === items.location ? { ...items, active: true } : { ...items, active: false }
      );
      // Set the new state 
      setAdminSidebar(updatedItems)
    }
    else if (user === "Admin") {

      const updatedItems = sellerSideBar.map(items =>
        currentlocation === items.location ? { ...items, active: true } : { ...items, active: false }
      );
      // Set the new state 
      setSellerSideBar(updatedItems)
    }
    else {

      const updatedItems = driverSidebar.map(items =>
        currentlocation === items.location ? { ...items, active: true } : { ...items, active: false }
      );
      // Set the new state 
      setDriverSidebar(updatedItems)
    }
  }, [])
  return (
    <div className="flex font-poppins z-50  font-normal ">
      {/* Fixed Left Sidebar */}
      <div
        className={`w-[320px] overflow:hidden transition transition-display ease-in-out duration-500  z-50  bg-main lg:block fixed custom-scrollbar ${toggleMenu ? "block" : "hidden"
          }`}
      >
        <div className="flex flex-col justify-center items-center p-5">
          <div className="flex w-full">
            <div className="w-full flex justify-end lg:justify-center p-5">
              <img
                src={dashlogo}
                className="w-[3.875rem] h-[4.75rem] "
                alt="Logo"
              />
            </div>
            <div className="flex justify-end items-center lg:hidden w-1/2">
              <ArrowBack
                onClick={() => dispatch(swipLeft(false))}
                className="text-[#fff]"
              />
            </div>
          </div>
          <div className="overflow-y-auto  w-full h-screen shadow-sm rounded-lg pb-40">
            {user === "SuperAdmin" &&
              adminSidebar?.map((item, index) => (
                <React.Fragment key={index}>
                  <NavLink
                    to={item.location}
                    onClick={() => {
                      const updatedItems = adminSidebar.map(items =>
                        item.location === items.location ? { ...items, active: true } : { ...items, active: false }

                      );
                      // Set the new state 
                      setAdminSidebar(updatedItems)
                      if (toggleMenu) {
                        dispatch(swipLeft(false))
                      }
                    }}
                    style={{ width: "100%" }}
                    className={`navlinks flex  items-center mt-5 transition duration-300 ease-in-out  hover:bg-main-hover hover:text-admin-color-hover rounded-lg cursor-pointer text-[1.25rem] font-inter p-3  gap-5 ${item.active ? "text-admin-color-hover bg-white" : "text-admin-color"}`}
                  >
                    <div>{item.icon}</div>
                    <div>{item.title}</div>

                  </NavLink>

                  {downArrows &&
                    item?.subItems?.map((nested2, subIndex) => (
                      <NavLink
                        to={nested2.location}
                        onClick={() => {
                          const updatedItems = item?.subItems.map(item2 =>
                            item2.location === nested2.location
                              ? {
                                ...item,
                                active: true,
                                subItems: item.subItems.map(subitem =>
                                  subitem.location === nested2.location
                                    ? { ...subitem, active: true }
                                    : { ...subitem, active: false }
                                )
                              }
                              : [...item,]
                          );
                          setAdminSidebar(updatedItems);
                        }}
                        key={subIndex}
                        style={{ width: "100%" }}
                        className="flex flex-wrap flex-row justify-left  items-center mt-5 transition duration-300 ease-in-out text-admin-color hover:bg-main-hover hover:text-admin-color-hover  rounded-lg cursor-pointer text-[1.25rem] font-inter p-3 w-[320px] gap-1"
                      >
                        <div>{nested2.icon}</div>
                        <div>{nested2.title}</div>
                      </NavLink>
                    ))}
                </React.Fragment>
              ))}
            {user === "RidePartner" &&
              driverSidebar?.map((item, index) => (
                <React.Fragment key={index}>
                  <NavLink
                    onClick={() => {
                      const updatedItems = driverSidebar.map(items => {
                        return item.location === items.location ? { ...items, active: true } : { ...items, active: false }

                      }
                      );
                      // Set the new state    

                      setDriverSidebar(updatedItems)
                      if (toggleMenu) {
                        dispatch(swipLeft(false))
                      }
                    }}
                    to={item.location}
                    style={{ width: "100%" }}
                    className={`navlinks flex fill-[white] items-center mt-5 transition duration-300 ease-in-out  hover:bg-main-hover hover:text-admin-color-hover hover:fill-[#A25EDF] rounded-lg cursor-pointer text-[1.25rem] font-inter p-3 w-full gap-5 ${item.active ? "bg-white text-admin-color-hover" : "text-admin-color"}`}
                  >
                    <div>{item.icon}</div>
                    <div>{item.title}</div>

                  </NavLink>

                  {downArrows &&
                    item?.subItems?.map((nested2, subIndex) => (
                      <NavLink
                        onClick={() => {
                          const updatedItems = driverSidebar.map(items => {
                            return nested2.location === items.location ? { ...item, active: false, subItems: { ...items, active: true } } : { ...items, active: false, subItems: { ...items, active: false } }
                          }
                          );
                          // Set the new state    

                          setDriverSidebar(updatedItems)
                        }}
                        to={nested2.location}
                        key={subIndex}
                        style={{ width: "100%" }}
                        className={`flex  items-center mt-5 fill-[white] transition duration-300 ease-in-out text-admin-color hover:bg-main-hover hover:text-admin-color-hover  hover:fill-[#A25EDF] rounded-lg cursor-pointer text-[1.25rem] font-inter p-3 w-[15rem] gap-5 ${nested2.active ? "bg-main-color text-admin-color=hover" : ""}`}
                      >
                        <div>{nested2.icon}</div>
                        <div>{nested2.title}</div>
                      </NavLink>
                    ))}
                </React.Fragment>
              ))}
            {user === "Admin" &&
              sellerSideBar?.map((item, index) => (
                <React.Fragment key={index}>
                  <NavLink
                    onClick={() => {
                      const updatedItems = sellerSideBar.map(items =>
                        item.location === items.location ? { ...items, active: true } : { ...items, active: false }
                      );
                      // Set the new state 
                      setSellerSideBar(updatedItems)
                      if (toggleMenu) {
                        dispatch(swipLeft(false))
                      }
                    }}
                    to={item.location}
                    style={{ width: "100%" }}
                    className={`navlinks flex fill-[white] items-center mt-5 transition duration-300 ease-in-out  hover:bg-main-hover hover:text-admin-color-hover hover:fill-[#A25EDF] rounded-lg cursor-pointer text-[1.25rem] font-inter p-3 w-[15rem] gap-5 ${item.active ? "bg-white text-admin-color-hover" : "text-admin-color"}`}
                  >
                    <div>{item.icon}</div>
                    <div>{item.title}</div>

                  </NavLink>

                  {downArrows &&
                    item?.subItems?.map((nested, subIndex) => (
                      <NavLink
                        to={nested.location}
                        key={subIndex}
                        style={{ width: "100%" }}
                        className="flex  flex-wrap flex-row justify-start items-center mt-5 fill-[white] transition duration-300 ease-in-out text-admin-color hover:bg-main-hover hover:text-admin-color-hover  hover:fill-[#A25EDF] rounded-lg cursor-pointer text-[1.25rem] font-inter p-3 w-[320px] gap-2"
                      >
                        <div>{nested.icon}</div>
                        <div>{nested.title}</div>
                      </NavLink>
                    ))}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="w-full ab overflow-y-hidden max-lg:ml-0 ml-[20rem]">
        <Header showUserPanel={showUserPanel} setShowUserPanel={setShowUserPanel} isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />
        <Outlet />
        {/* <TicketSubject /> */}
      </div>
    </div>
  );
};

export default SideBar;
