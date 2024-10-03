import React, { useEffect, useState } from "react";
import CardStats from "../../components/adminComponents/Sales/components/Cards/Cards";
import Invoices from "../../components/adminComponents/Sales/components/invoices/Invoices";
const Sales=()=>{
  return (
    <div className=" p-2 mt-20 font-poppins text-main-color font-normal ">
       <h1 className="text-[21px] font-normal">Sales Overview</h1> 
        <CardStats/>      
        <Invoices/>
    </div>
  );
};

export default Sales;
