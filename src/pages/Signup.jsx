import signupImg from "../assets/signupImg.png";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    ;
    navigate("/Login")
  };
  return (
    <div className="flex flex-row flex-wrap justify-between font-poppins font-normal">

      <div className="bg-main-color  sm:hidden md:flex lg:flex w-[50%] max-sm:hidden h-screen flex flex-row  flex-row h-screen justify-center items-center">
        <img onError={(e) => {
          e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
        }} src={signupImg} className="w-[60%] " />
      </div>
      <div className="w-[100%]  md:w-[50%] lg:w-[50%]  ">
        <div className="h-screen overflow-x-hidden  w-[100%]  overflow-y-auto flex  flex-wrap justify-center items-center">
          <div className="p-1 rounded-lg max-sm:w-64 sm:w-72 md:w-96">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex max-sm:flex-col max-sm:gap-0 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-main-color font-normal"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`w-full mt-1 p-2 border rounded-lg focus:ring outline-none ${errors.firstName && "border-red-500"
                      }`}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-[12px]">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-main-color font-normal"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`w-full mt-1 p-2 border rounded-lg focus:ring outline-none ${errors.lastName && "border-red-500"
                      }`}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-[12px]">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-main-color  font-normal"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring outline-none ${errors.email && "border-red-500"
                    }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-[12px]">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-main-color font-normal"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring outline-none ${errors.password && "border-red-500"
                    }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-[12px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-main-color font-normal"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring outline-none ${errors.country && "border-red-500"
                    }`}
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-red-500 text-[12px]">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="inline mr-5">
                  <i onClick={() => {

                  }} className="pi  rounded-full pi-check w-[25px] border border-main-color cursor-pointer h-[25px] text-white bg-main-color p-[4px] text-[14px]" />
                </div>
                <label htmlFor="terms" className="camel-case cursor-pointer inline text-main-color">
                  I Agree{" "}
                  <span className="underline ">Terms And Conditions</span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-[12px]">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-main-color  mt-10 text-[20px]  text-white py-2 px-4 rounded-lg outline-none"
                disabled={!!errors.terms}
              >
                Join
              </button>
            </form>
            <div className="flex flex-wrap mt-2 flex-row ">
              <Button icon="pi pi-arrow-left mr-2" onClick={() => {
                navigate("/Login")
              }} className=" text-main-color pr-3 pl-3 p-2 text-" >Back To Login </Button>
            </div>
            <span className="flex justify-center mt-5 text-[#A0E3F2]">
              or Continue With
            </span>
            <div className="flex justify-center cursor-pointer gap-5 mt-7">
              <svg
                width="40"
                height="40"
                viewBox="0 0 88 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0516 2.6724C19.1778 6.39701 9.90374 14.5462 4.75429 24.8201C2.95448 28.3697 1.65461 32.1443 0.879693 36.0439C-1.0951 45.7429 0.279756 56.0668 4.75429 64.9159C7.65398 70.6903 11.8285 75.8147 16.878 79.8143C21.6525 83.6139 27.2019 86.4136 33.1013 87.9884C40.5255 89.9882 48.4497 89.9382 55.9489 88.2384C62.7232 86.6886 69.1225 83.4389 74.222 78.7394C79.6214 73.7649 83.471 67.2406 85.5208 60.2164C87.7456 52.5422 88.0455 44.368 86.6457 36.5188C72.6471 36.5188 58.6486 36.5188 44.6251 36.5188C44.6251 42.3182 44.6251 48.1426 44.6251 53.942C52.7242 53.942 60.8484 53.942 68.9475 53.942C67.9976 59.5164 64.698 64.5909 59.9985 67.7406C57.0488 69.7154 53.6741 71.0152 50.1745 71.6152C46.6499 72.2151 43.0253 72.2901 39.5256 71.5902C35.951 70.8902 32.5514 69.3904 29.5767 67.2906C24.8272 63.966 21.2026 59.0665 19.3528 53.5921C17.4529 48.0176 17.428 41.7933 19.3528 36.2189C20.6776 32.2943 22.9024 28.6447 25.8271 25.695C29.4267 21.9954 34.1012 19.3706 39.1507 18.2958C43.4752 17.3709 48.0247 17.5458 52.2493 18.8207C55.8489 19.9206 59.1486 21.8704 61.8733 24.4701C64.623 21.7454 67.3477 18.9957 70.0974 16.271C71.5223 14.7961 73.0471 13.3963 74.447 11.8714C70.2974 8.02184 65.3979 4.92216 60.0735 2.97237C50.5245 -0.602257 39.7006 -0.67725 30.0516 2.6724Z"
                  fill="white"
                />
                <path
                  d="M30.0536 2.67211C39.7026 -0.677539 50.5264 -0.602545 60.1254 2.94708C65.4499 4.89688 70.3244 7.99655 74.4989 11.8461C73.0991 13.346 71.5992 14.7708 70.1494 16.2457C67.3997 18.9704 64.675 21.7201 61.9252 24.4448C59.2005 21.8451 55.9009 19.8703 52.3013 18.7954C48.0767 17.5205 43.5272 17.3456 39.2026 18.2705C34.1532 19.3454 29.4787 21.9951 25.879 25.6697C22.9543 28.6194 20.7296 32.269 19.4047 36.1936C14.5302 32.419 9.65574 28.6194 4.78125 24.8448C9.90571 14.5459 19.1797 6.39672 30.0536 2.67211Z"
                  fill="#E94435"
                />
                <path
                  d="M0.879693 36.0436C1.65461 32.1441 2.97947 28.3695 4.75429 24.8198C9.62877 28.5944 14.5033 32.394 19.3777 36.1686C17.453 41.743 17.4779 47.9674 19.3777 53.5418C14.5033 57.3164 9.62877 61.116 4.75429 64.8906C0.279756 56.0915 -1.0951 45.7426 0.879693 36.0436Z"
                  fill="#F8BB15"
                />
                <path
                  d="M44.6524 36.4937C58.651 36.4937 72.6495 36.4937 86.673 36.4937C88.0729 44.3428 87.7729 52.517 85.5481 60.1912C83.4984 67.2154 79.6488 73.7647 74.2493 78.7142C69.5248 75.0396 64.7753 71.365 60.0758 67.6904C64.7753 64.5657 68.075 59.4662 69.0249 53.8918C60.9257 53.8918 52.8016 53.8918 44.7024 53.8918C44.6274 48.1174 44.6524 42.318 44.6524 36.4937Z"
                  fill="#547DBE"
                />
                <path
                  d="M4.75391 64.9157C9.62839 61.1411 14.5029 57.3415 19.3774 53.5669C21.2272 59.0663 24.8518 63.9408 29.6013 67.2655C32.576 69.3652 35.9756 70.8401 39.5502 71.565C43.0499 72.2649 46.6995 72.1899 50.1991 71.59C53.6988 70.9901 57.0734 69.6902 60.0231 67.7154C64.7476 71.39 69.4971 75.0646 74.1966 78.7393C69.0971 83.4638 62.6978 86.6884 55.9235 88.2383C48.4493 89.9381 40.5251 89.9881 33.0759 87.9883C27.1765 86.4134 21.6271 83.6137 16.8526 79.8141C11.8282 75.7896 7.6536 70.6651 4.75391 64.9157Z"
                  fill="#34A751"
                />
              </svg>
              <svg
                width="40"
                height="40"
                viewBox="0 0 77 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M57.296 0C52.2627 0.284748 46.4843 3.01469 43.0487 6.49116C39.9449 9.65314 37.4961 14.3492 38.4957 18.8924C43.9656 19.0327 49.4558 16.232 52.743 12.6918C55.8119 9.38107 58.1385 4.75996 57.296 0ZM57.5944 18.8841C49.6974 18.8841 46.3956 23.6072 40.9257 23.6072C35.2987 23.6072 30.1547 19.183 23.3447 19.183C14.0813 19.1872 0 27.5412 0 47.2228C0 65.1279 16.6656 84.9994 26.0731 84.9994C31.7874 85.0546 33.1727 81.5015 40.9257 81.4633C48.6874 81.408 50.3622 85.0461 56.0853 84.9994C62.5286 84.9526 67.5606 78.0593 71.2363 72.5981C73.873 68.6881 74.957 66.692 77 62.272C61.8389 58.532 58.8224 34.7293 77 29.8079C73.5688 24.1087 63.5532 18.8841 57.5944 18.8841Z"
                  fill="black"
                />
              </svg>
              <svg
                width="40"
                height="40"
                viewBox="0 0 96 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48.3633 95C74.5968 95 95.8633 73.7335 95.8633 47.5C95.8633 21.2665 74.5968 0 48.3633 0C22.1298 0 0.863281 21.2665 0.863281 47.5C0.863281 73.7335 22.1298 95 48.3633 95Z"
                  fill="#1977F3"
                />
                <path
                  d="M66.8535 61.2322L68.9577 47.4986H55.7851V38.5877C55.7851 34.8337 57.622 31.1665 63.527 31.1665H69.5188V19.4768C69.5188 19.4768 64.0814 18.5483 58.8845 18.5483C48.0365 18.5483 40.9426 25.1213 40.9426 37.0313V47.4986H28.8789V61.2322H40.9426V94.4241C43.3607 94.8048 45.8389 94.9986 48.3639 94.9986C50.8888 94.9986 53.367 94.7982 55.7851 94.4241V61.2322H66.8535Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
