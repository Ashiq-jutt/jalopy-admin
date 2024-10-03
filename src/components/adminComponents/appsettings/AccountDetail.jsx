
const AccountDetail = () => {
  return (
    <div className="font-poppins font-normal text-main-color bg-[#F2F2F2] mt-5 p-5 rounded-lg">
      <p className="text-main-color font-bold text-[21px] ">Account Details</p>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Company/App Name</p>
        <p className="w-full  md:w-[auto]">Jalopy.Pro</p>
      </div>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Company/App Logo</p>   
         <h1 className="text-white bg-main-color text-center rounded-md w-full  md:w-[auto] p-1 pr-3 pl-3 ">Choose File</h1>
      </div>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Company/App Website</p>
        <p className="w-full  md:w-[auto]">www.jalopy.pro.com</p>
      </div>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Email ID</p>
        <p className="w-full  md:w-[auto]">jalopy.pro@gmail.com</p>
      </div>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Password</p>
        <div className="flex flex-wrap  w-full md:w-[auto] justify-between items-center">
          <p>Last Updated: 02 June2023</p>
          <button className="bg-main-color text-white p-2 w-[100%] md:w-[180px] ml-2 rounded-lg">
            Update Password
          </button>
        </div>
      </div>
      <div className="flex flex-wrap  justify-between mt-3">
        <p className="font-normal">Company/App Type</p>
        <p className="w-full  md:w-[auto]">Food And Ride</p>
      </div>
    </div>
  );
};

export default AccountDetail;
