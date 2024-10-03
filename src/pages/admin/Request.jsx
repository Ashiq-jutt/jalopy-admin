import React, { useState } from "react";
import CardProgres from "../../components/ResubleComponents/CardProgres";
import Data from "../../utils/CompontStaticData";
import ListUsers from "../../components/ResubleComponents/ListUsers";
import consumer from "../../assets/consumer.png";
import RequestList from "../../components/ResubleComponents/RequestList";
import CardRequest from "../../components/adminComponents/request/ResturantCardRequest";
const Request = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [reqComponent, setreqComponent] = useState("Restaurants");

  const handleButtonClick = (index, lable) => {
    setActiveButtonIndex(index);
    setreqComponent(lable);
  };
  const dataDriver = [
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },
    {
      customerid: 2150314,
      image: consumer,
      DriverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },
    {
      customerid: 2150314,
      image: consumer,
      DriverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },
    {
      customerid: 2150314,
      image: consumer,
      DriverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },
    {
      customerid: 2150314,
      image: consumer,
      DriverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },
    {
      customerid: 2150314,
      image: consumer,
      DriverName: "Robert jack",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      city: "Marc",
    },

    // Add more dummy data as needed
  ];
  const dataSupportTicket = [
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Alic",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      createdate: "20-08-2023",
      assignee: "Katherine. m",
      status: "Open",
    },

    // Add more dummy data as needed
  ];
  const dataPromotion = [
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2024",
    },
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2023",
    },
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2023",
    },
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2023",
    },
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2023",
    },
    {
      customerid: 2150314,
      image: consumer,
      restaurant: "tasty trails",
      productname: "chickens burger",
      condition: "percentage",
      price: "€50",
      from: "20-08-2023",
      to: "25-08-2023",
    },

    // Add more dummy data as needed
  ];
  const dataPayouts = [
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit",
      requestdate: "20-08-2023",
      amount: "€50",
      status: "Open",
    },

    // Add more dummy data as needed
  ];
  const dataCars = [
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },
    {
      customerid: 2150314,
      image: consumer,
      driverName: "Robert jack",
      carname: "Ranglar",
      carno: "Abc,0000, xyz",
      cartype: "sedan",
      seats: "7",
    },

    // Add more dummy data as needed
  ];
  const dataCampan = [
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },
    {
      customerid: 2150314,
      image: consumer,
      requester: "Robert jack",
      subject: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      requestdate: "20-08-2023",
      campaigntimeline: "Aug 8-22",
    },

    // Add more dummy data as needed
  ];
  return (
    <>
      {" "}
      <div className="p-5 overflow-y-hidden">
        <CardProgres />
        <div className="flex justify-between rounded-xl p-5">
          <p className="text-[1.5rem] text-[#A0E3F2]">Requests</p>
          {Data?.Data?.requestButton?.map((item, index) => (
            <div
              key={index}
              className={` text-[12px] flex justify-center items-center rounded-xl w-[7rem] p-2 cursor-pointer
              ${
                activeButtonIndex === index
                  ? "bg-[#022859] text-white"
                  : "border-[#022859] text-black border"
              }
            `}
              onClick={() => handleButtonClick(index, item.lable)}
            >
              {item.lable}
            </div>
          ))}
        </div>
      </div>
      {reqComponent === "Restaurants" ? (
        <CardRequest />
      ) : (
        <RequestList
          TableHead={
            (reqComponent === "Drivers" && Data.reqHeadDriver) ||
            (reqComponent === "Cars" && Data.reqHeadCar) ||
            (reqComponent === "Promotions" && Data.reqHeadPromotion) ||
            (reqComponent === "Support Tickets" && Data.reqHeadSupportTicks) ||
            (reqComponent === "Payouts" && Data.reqHeadPayouts) ||
            (reqComponent === "Campaign" && Data.reqHeadCampain)
          }
          Data={
            (reqComponent === "Drivers" && dataDriver) ||
            (reqComponent === "Support Tickets" && dataSupportTicket) ||
            (reqComponent === "Promotions" && dataPromotion) ||
            (reqComponent === "Payouts" && dataPayouts) ||
            (reqComponent === "Cars" && dataCars) ||
            (reqComponent === "Campaign" && dataCampan)
          }
        />
      )}
    </>
  );
};

export default Request;
