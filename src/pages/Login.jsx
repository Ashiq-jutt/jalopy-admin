import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import backlogin from "../assets/backlogin.png";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Axios from "axios";
import "./css/login.css";
//import {InputText} from "primereact/Inputtext"
import { InputText } from "primereact/inputtext"; 
import { Dialog } from "primereact/dialog";
import LoaderButton from "../components/Common/Components";
import TermsConditions from "./TermsCondition";
const Login = ({isGerman}) => {  
  const [showPassword,setShowPassword]=useState(false) 
  const [termsConditionDialog,setTermsConditionDialog]=useState(false) 
  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
};
  useEffect(()=>{     

     if(localStorage.getItem("typeOfUser")){ 
      if (localStorage.getItem("typeOfUser") === "RidePartner" ) { 
            
        navigate("/sidebar/dashboardDriver"); 
          
        }  
        else if(localStorage.getItem("typeOfUser") === "Admin" ){  
          
          navigate("/sidebar/dashboardSeller");  
          
        }
        else {  
         navigate("/sidebar/dashboard");    
          
      }   
    }
  },[])
  const [loader, setLoader] = useState(false);    
  const [signUpAs,setSignUpAs]=useState(false)   
  const toast = useRef();
  const [agree,setAgree]=useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email Is Required"),
    password: Yup.string().required("Password Is Required"),
    agree:Yup.boolean()
    .oneOf([true], 'Accept the terms and conditions.')
    .required('This field is required.')
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "", 
       agree:"",
    },
    validationSchema,
    onSubmit: (values) => {    
      setLoader(true);
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/Account/authenticate`,
        values
      )
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <h1 className="font-poppins text-main-color">
                Successfully Logged In
              </h1>
            ),
          });
          localStorage.setItem("userData", JSON.stringify(res?.data));
          setLoader(false);
          if (res?.data?.data?.roles[0] === "RidePartner" && res?.data?.data?.roles?.length === 1) { 
            
          localStorage.setItem("typeOfUser", res?.data?.data?.roles[0]);
            navigate("/sidebar/dashboardDriver"); 
            
          }  
          else if(res?.data?.data?.roles[0] === "Admin" && res?.data?.data?.roles?.length === 1){  
            
          localStorage.setItem("typeOfUser", res?.data?.data?.roles[0]); 
            navigate("/sidebar/dashboardSeller");  
            
          }
          else {  
            
          localStorage.setItem("typeOfUser", "SuperAdmin");    
            navigate("/sidebar/dashboard");    
            
          }
          // setLoggedIn(prev=>!prev)
        })
        .catch((error) => {
          ;
          setLoader(false);
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <h1 className="font-poppins ">
                Enter Password Or Email Is Incorrect
              </h1>
            ),
          });
        }); 
      
    }, 
  
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap flex-row justify-between items-center ">
      <div className="bg-main-color  sm:hidden md:flex lg:flex w-[50%] max-sm:hidden h-screen flex flex-row  flex-row h-screen justify-center items-center ">
        <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={backlogin} alt="" className="w-[60%]" />
      </div>
      <div className="w-[100%]  md:w-[50%] lg:w-[50%]  ">
        <div className="h-screen w-[100%]  overflow-y-auto flex  flex-wrap justify-center items-center   ">
          <div className="sm:hidden   bg-main-color w-auto h-[20vh] flex justify-center items-center p-2 rounded-lg">
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src={ backlogin} />
          </div>
          <div className="p-1 rounded-lg max-sm:w-64   max-sm:mt-3 w-96">
            <form>
              <div className="mb-4 ">
                <label
                  htmlFor="email"
                  className="block text-main-color  font-poppins font-normal "
                >
                  {isGerman ? "Nutzerman": "User Name"}
                </label>
                <InputText
                  value={formik.values.email} 
                  onPaste={handlePaste}
                  onChange={formik.handleChange}
                  name="email"
                  className={`w-full text-main-color mt-1 p-2 border font-poppins rounded-lg bg-white  outline-none ${
                    formik.touched.email &&
                    formik.errors.email &&
                    "border-red-500 text-[12px]"
                  }`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="mt-2 ml-1 font-poppins text-red-500">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-main-color  font-poppins font-normal ">
                  {isGerman ? "Passwort":"Password"}
                </label>       
               
                 <div className={`flex flex-wrap w-full pr-2 rounded-lg  bg-white overflow-hidden border flex-row justify-between items-center ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500 text-[12px]"
                  }`}>
                <InputText
                  name="password"
                  value={formik.values.password}  
                  onPaste={handlePaste}
                  type={`${showPassword ? "text" :"password"}`}   
                  style={{color:"rgb(162,94,223) !important"}}
                  onChange={formik.handleChange}
                  className={`text-main-color w-[calc(100%-20px)] mt-1 p-2   font-poppins  outline-none ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500 text-[12px]"
                  }`} 

                /> 
                 <i onClick={()=>{ 
                  setShowPassword(prev=>!prev)
                 }} className={`pi cursor-pointer text-main-color  ${showPassword ? "pi-eye":"pi-eye-slash"}`}/>  
                 </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-2 ml-1 font-poppins text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-center items-center gap-3 max-sm:mt-10 mt-4">
              <div onClick={()=>{ 
                       setAgree(prev=>!prev) 
                       formik.setFieldValue("agree",!formik.values.agree)
                    }} className="flex flex-wrap cursor-pointer flex-row justify-center items-center border border-main-color rounded-full  overflow-hidden  pt-[2px] h-[20px] w-[22px] "> 
                    <i  className={`pi  ${agree ? "pi-check":""}     text-main-color bg-white text-[14px] `}/>
                </div>   

                <div className="flex  w-full flex-col text-main-color">
                  {" "}
                  <label 
                  onClick={()=>{ 
                    setTermsConditionDialog(true)
                  }}
                    htmlFor="terms"
                    className="camel-case text-[14px] md:text-[16px] font-poppins font-normal"
                  >   
                  {isGerman ? "Ich stimme den" 
                    :"i Agree"} {" "}
                    <span className="underline  cursor-pointer ">
                      {!isGerman ? "Terms And Conditions":"Allgemeinen Geschäftsbedingungen zu"}
                    </span>
                  </label> 
                 
                </div>  
            
              </div> 
              {formik.touched.agree && formik.errors.agree ? (
                  <p className="mt-2 pl-8 flex md:text-[14px] text-[12px]  w-full flex-col font-poppins text-red-500">
                    {formik.errors.agree}
                  </p>
                ) : null}
              <div className="w-[70%]  bg-main-color transform ml-[50%] rounded-full w-full translate-x-[-50%] flex flex-wrap flex-row bg-custom-gradient items-center justify-around mt-4">
                {loader ? (
                  <div className="mt-[8px] mb-[8px]  w-full flex flex-wrap flex-row justify-center items-center">
                    {" "}
                    <LoaderButton />
                  </div>
                ) : (
                  ""
                )} 
                {!loader ?
                <Button
                  // onClick={()=>{setLoggedIn(prev=>!prev)}}
                  className="bg-main-color w-full loginbutton font-poppins   p-3 text-center rounded-full  font-bold w-[40%] font-normal text-white"
                  label={`${loader ? "":`${isGerman ? "Anmedung": "Login"}`}`}
                  type="button"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                /> :""   }
              </div>
              <h1 className="text-center text-main-color font-poppins font-normal  mt-4  ">
                {isGerman ? "der":"Or"}{" "}
                <span onClick={()=>{ 
                  setSignUpAs(prev=>!prev)
                }} className="underline cursor-pointer">
                 {isGerman ? "Hier beitreten":"Join Here"}
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast} />  
       
       <Dialog headerClassName="text-main-color text-[14px] font-poppins"  header={`${isGerman ? "Anmeldebestätigung":"Sign  Up Confirmation"}`}  visible={signUpAs} onHide={()=>{ 
        setSignUpAs(prev=>!prev) 

       }}> 
              <div> 
                  <div className="flex  w-full flex flex-wrap flex-row justify-evenly"> 
                      <Button  
                         onClick={()=>{ 
                          navigate("/BecomeRider")
                        }}
                       className="bg-main-color font-poppins w-[150px] p-0 rounded-md mt-2 p-1 pr-4 pl-4 text-white mr-2 " label={`${isGerman ? "Fahrpartner": "Ride Partner"}`}/>
                      <Button onClick={()=>{ 
                        navigate("/BecomeSeller")
                      }} className="p-1 pl-4 pr-4 mt-2 font-poppins rounded-md w-[150px] bg-main-color text-white " label={`${isGerman ? "Verkäufer":"Seller"}`}/>
                  </div>
              </div>
           </Dialog>  
           <Dialog  
            visible={termsConditionDialog}  
            header="Terms And Conditions" 
            className="w-[95%] md:w-[90%]"
            headerClassName="tracking-wide font-poppins font-bold text-main-color"
           onHide={()=>{
            setTermsConditionDialog(false)
           }}>
              
             <TermsConditions/>
           </Dialog>
    </div>
  );
};

export default Login;
