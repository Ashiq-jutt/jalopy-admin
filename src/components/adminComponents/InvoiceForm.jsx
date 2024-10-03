import logo from "../../assets/logo.svg";
const InvoiceForm = () => {
  return (
    <div className="font-inter flex ">
      <div className="bg-[#022859] text-white w-1/5 text-[12px] flex flex-col pl-10 pb-24">
        <div className="flex  p-12">
          <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={logo} alt="" className="w-20 h-20 " />
        </div>
        <div>
          <p>Billing To:</p>
          <p className="mt-3">Tasty Tail Resturant</p>
          <p className="mt-3 text-[#A0E3F2]">123,Street, CA New Yourk, USA</p>
          <p className="mt-3">
            P: <span className="text-[#A0E3F2]">000-000-000</span>
          </p>
          <p>
            E: <span className="text-[#A0E3F2]">abc@gmail.com</span>
          </p>
          <p>
            W: <span className="text-[#A0E3F2]">www.company.com</span>
          </p>
        </div>
        <div className="mt-12">
          <p className=" ">INVOICE DETAILS </p>
          <p className=" mt-3">Invoice no:</p>
          <p className="text-[#A0E3F2]">0000pc</p>
          <p className=" mt-3">Invoice date</p>
          <p className="text-[#A0E3F2]">1 september 2023</p>
          <p className=" mt-3">Customar id</p>
          <p className="text-[#A0E3F2]">CUSTPC01</p>
        </div>
        <div className="mt-5">
          <p className="">COMPANY DETAILS</p>
          <p className="mt-3 text-[#A0E3F2]">jalopy.Pro</p>
          <p className="mt-3 text-[#A0E3F2]">abc street, USA</p>
        </div>
        <div className="mt-12">
          <p>PAYMENT DETAILS:</p>
          <p className="mt-3">Bank Transfer</p>
          <p>
            Name: <span className="text-[#A0E3F2]">jalopy.pro</span>
          </p>
          <p>
            A/C no: <span className="text-[#A0E3F2]">00000000</span>
          </p>
          <p>
            Bank Name: <span className="text-[#A0E3F2]">abc Bank lmt</span>
          </p>
          <p>
            IFSC: <span className="text-[#A0E3F2]">ICIC000000</span>
          </p>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-4/5 p-10">
        <p className="text-[28px] mt-24 font-normal text-[#022859]">
          INVOICE
        </p>
        <div className="table w-full mt-10">
          <div className="w-full bg-[#022859] flex justify-between p-2 text-[white] rounded-lg">
            <div className="table-cell">Description</div>
            <div className="table-cell">Rate</div>
            <div className="table-cell">Qty</div>
            <div className="table-cell">Total</div>
          </div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="flex justify-between p2  rounded-lg  ">
              <div className="table-cell ">
                <p className="text-[#022859]">Line Item</p>
                <p className="text-[#aca9a9]">Lorem Ipsum</p>
              </div>
              <div className="table-cell text-[#8b8a8a]">€100</div>
              <div className="table-cell text-[#8b8a8a]">5</div>
              <div className="table-cell text-[#8b8a8a]">€500.00</div>
            </div>
          ))}
        </div>
        <div className="border-[#022859] border mt-5"></div>
        <div className="flex justify-between">
          <p>Sub Total</p>
          <p>€398394</p>
        </div>
        <p className="text-[#8b8a8a]">Tax (MwSt):19%</p>
        <div className="border-[#022859] border mt-5"></div>
        <div className="flex justify-between items-center mt-2">
          <p>GRAND TOTAL</p>
          <p>€398394</p>
        </div>
        <div className="border-[#022859] border mt-5"></div>
        <div className="text-[#022859] w-full flex  justify-end mt-16 ">
          <div>
            <p className=" font-bold">Director Sign</p>
            <p>Director</p>
          </div>
        </div>
        <div>
          <p className="text-[1rem] font-normal text-[#022859]">
            {" "}
            Terms & conditions
          </p>
          <p className="text-[#8b8a8a]">
            here are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum
          </p>
        </div>
        <div className="border-[#022859] border mt-5"></div>
        <div className="text-[#8b8a8a] flex justify-between">
          <p>000-0000-00</p>
          <p>jalopay.pro@gmail.com</p>
          <p>www.jalopy.pro</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
