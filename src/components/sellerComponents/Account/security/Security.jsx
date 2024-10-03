import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import ChangePassword from "./Dialogs/ChangePassword";
import ChangeEmail from "./Dialogs/ChangeEmail";
import ChangeNumber from "./Dialogs/ChangeNumber";
export default function Security() {
  const [changePasswordVisibility, setChangePasswordVisibility] =
    useState(false);
  const [changeEmailVisibility, setChangeEmailVisibility] = useState(false);
  const [changeNumberVisibility, setChangeNumberVisibility] = useState(false);

  return (
    <div>
     
      <div
        onClick={() => {
          setChangeEmailVisibility(true);
        }}
        className="flex mt-10 cursor-pointer flex-wrap flex-row items-center justify-between "
      >
        <p>Change Password</p>

        <i className="pi pi-angle-right" />
      </div>
     <div
        onClick={() => {
          setChangePasswordVisibility(true);
        }}
        className="flex mt-10 flex-wrap  cursor-pointer flex-row items-center  justify-between "
      >
        <p>Change Email</p>

        <i className="pi pi-angle-right" />
      </div> 
         {/*
      <div   

        onClick={() => {
          setChangeNumberVisibility(true);
        }}
        className="flex mt-10 flex-wrap cursor-pointer flex-row items-center justify-between "
      >
        <p>Change Number</p>
        <i className="pi pi-angle-right" />
      </div>   
      */}
      <Dialog
        header="Change Email"
        headerClassName="text-main-color tracking-wide text-[14px] font-poppins font-medium"
        visible={changePasswordVisibility}   
         className="w-[95%] md:w-[50vw]"
        onHide={() => {
          setChangePasswordVisibility(false);
        }}
      >
                <ChangeEmail setChangePasswordVisibility={setChangePasswordVisibility}/>
      </Dialog>
      <Dialog
        header="Change Password "
        headerClassName="font-poppins tracking-wide font-normal changepassword text-main-color"
        visible={changeEmailVisibility} 
        className="w-[95%] md:w-[50vw]"
        onHide={() => {
          setChangeEmailVisibility(false);
        }}
      >
        <ChangePassword setChangeEmailVisibility={setChangeEmailVisibility}/>
      </Dialog>
      <Dialog
        header="Change Number"
        headerClassName="font-poppins tracking-wide font-medium text-main-color"
        visible={changeNumberVisibility}
        style={{ width: "50vw" }}
        onHide={() => {
          setChangeNumberVisibility(false);
        }}
      >
  <ChangeNumber setChangeNumberVisibility={setChangeNumberVisibility}/>
      </Dialog>
    </div>
  );
}
