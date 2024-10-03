import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
export default function MainAddProduct({ setAddProductDialog,setRefreshProduct,vendorId}) {
  const toast = useRef();
  const [ProductCategory, setProductCategory] = useState([]);
  let token = JSON.parse(localStorage.getItem("userData"))?.data?.jwToken;
  const [loaderShow, setLoaderShow] = useState(false);  
  const [Allergians,setAllergians]=useState([])   
  const [addItemValue,setAddItemValue]=useState() 
  const [addItem,setAddItem]=useState(false)
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ProductCategory`,
      {
        params: { VendorShopId: vendorId },
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Successfully Fetched MenuItems"}
            </p>
          ),
        });
        setProductCategory(res?.data?.data);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins text-main-color">
              {error?.response?.data?.message
                ? error?.response?.data?.message
                : "Menu Items Fetching Failed"}
            </p>
          ),
        });
      });
  }, []);  
  const [productimg,setproductimg]=useState()
  const formik = useFormik({
    initialValues: {
      Description: "",
      Name: "",
      ProductPicture: "",
      VendorShopId: vendorId,
      CategoryId: "",
      Tax:"",
      PickupPrice:"",   
      Price:"",
      DeliveryPrice:"", 
      Allergians:"",
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name Is Required"),
      Description: Yup.string().required("Description Is Required"), 
    }),
    onSubmit: (values, { resetForm }) => {
      setLoaderShow(true); 
      let allergstring=""
      for(let i=0;i<Allergians?.length;i++){  
        if(i===0){
          allergstring=Allergians[i] 
        } 
        else{ 
          
          allergstring=`${allergstring},${Allergians[i]}`
        }
      } 
       
      formik.values.Allergians=allergstring

     let formData=new FormData() 
       Object.keys(formik.values).map(item=>{  
         if(item === "ProductPicture"){ 
             if(formik.values[item] !== ""){ 
                
        formData.append(item,formik.values[item]) 
             }
         } 
         else{  
        formData.append(item,formik.values[item]) 
         }
       })
      Axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/Product`,formData, {
        params: { VendorShopId: vendorId },
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins ">
                {res?.data?.message
                  ? res?.data?.message
                  : "Product Added Successfully"}
              </p>
            ),
          });
          setLoaderShow(false);
          setTimeout(() => {   
            setRefreshProduct(prev=>!prev)  
            setAddProductDialog(prev=>!prev)
          }, 1000);
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins text-main-color">
                {error?.response?.data?.Message
                  ? error?.response?.data?.Message
                  : "Product Addition Failed"}
              </p>
            ),
          });
          setLoaderShow(false);
        });
    },
  }); 
  const productPicRef=useRef()
  return (
    <form onSubmit={formik.handleSubmit}  className="p-2 text-main-color font-poppins">
      <div className="mt-0 mb-10 flex  font-poppins font-normal flex-wrap flex-row justify-center sm:justify-center md:justify-between lg:justify-between">
      <div className="mt-4 flex w-full flex-wrap items-start flex-row justify-center gap-4  md:justify-start">  
         <label className="text-left md:text-center md:w-auto w-[90%]">Product Image</label> 
           <div onClick={()=>{ 
              productPicRef.current.click()
              }}  className="  cursor-pointer text-main-color  md:w-[50%] w-[90%] text-white flex flex-wrap flex-row justify-left gap-2 items-start"> 
                      <p className="bg-main-color text-white rounded-lg font-poppins  tracking-wide p-1"> Choose File</p>  
                      <p className="text-main-color w-[calc(100%-200px)]"> {formik.values.ProductPicture ? formik.values.ProductPicture.name :"No File Choosen" }</p>
                </div> 
         <InputText ref={productPicRef} name="ProductPicture" onChange={(e)=>{ 
              formik.setFieldValue("ProductPicture",e.target.files[0])    
               let reader=new FileReader() 
               reader.readAsDataURL(e.target.files[0])
                reader.onload=()=>{ 
                   setproductimg(reader.result)
                }
         }} type="file" accept="Image/*" placeholder="0028" className=" hidden p-1 ml-4  "/>     
       {productimg ?  <div className="flex flex-wrap flex-row justify-center items-center "> 
         <div className="overflow-hidden w-[100px]  mt-4  rounded-full h-[100px] flex flex-wrap flex-row justify-center items-center overflow-hIdden" >
                 
            <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }} onLoad={(event)=>{ 
          const { naturalWidth, naturalHeight } = event.target; 
           if(naturalWidth > naturalHeight){ 
            event.target.style="width:auto;height:100%"  
             
           } 
           else{ 
            event.target.style="width:100%;height:auto"  
         
           }

         }}   src={productimg} />  
         </div>

         </div>  
          :""}
        </div> 
          <div className="w-full mt-2 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
          <label className="">Product Name</label>
          <InputText
            name="Name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.Name}
            className="text-main-color border w-full mt-2 p-2  font-poppins border-[#A767E0]"
          />
          {formik.touched.Name && formik.errors.Name ? (
            <p className="text-red-500 mt-2  w-full text-[14px]">
              {formik.errors.Name}
            </p>
          ) : undefined}
        </div>
        <div className="w-full   mt-2 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
          <label className="">Product Category</label>
          <Dropdown
            name="CategoryId"
            placeholder="Product Category"
            onChange={formik.handleChange}
            value={formik.values.CategoryId}
            className="text-main-color border w-full mt-2 p-0 border-[#A767E0]"
            options={ProductCategory}
            optionLabel="title"
            optionValue="id"
          />
          {formik.touched.CategoryId && formik.errors.CategoryId ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.CategoryId}
            </p>
          ) : undefined}
        </div>
        <div className="w-full   mt-2 font-poppins font-normal   ">
          <label className="">Description</label>
          <InputTextarea
            name="Description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.Description}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
          />
          {formik.touched.Description && formik.errors.Description ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.Description}
            </p>
          ) : undefined}
        </div>
       

        {/*<div className="w-full   mt-2 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
          <label className="">Allergian</label>
          <InputText
            name="allergian"
            placeholder="Allergian"
            onChange={formik.handleChange}
            value={formik.values.allergian}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>                     
        <div className="w-full  mt-7 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
        <div className="  w-[150px]   rounded ml-5 mt-2  pl-3 pr-3 p-1 bg-main-color flex flex-wrap flex-row items-center text-white justify-left"> 
             <h1 className="  rounded font-normal  ">Add More  </h1> 
             <i className=" ml-2 pi pi-plus  "></i>
          </div>
        </div>     
        <div className="w-full   mt-2 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
          <label className="">Item ID</label>
          <InputText
            name="itemid"
            placeholder="Item ID"
            onChange={formik.handleChange}
            value={formik.values.itemid}
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
          />
        </div>      
        <div className="w-full   mt-2 font-poppins font-normal md:w-[49.5%] lg:w-[49.5%]  ">
          <label className="block">Item Img</label>
              <input className="mt-5" type="file"/>
        </div>   
        */}
        
        <div className="w-full   mt-2 font-poppins font-normal md:w-[22.3%]  ">
          <label className="">Tax</label>
          <Dropdown
            name="Tax"
            placeholder="Tax"
            onChange={formik.handleChange}
            value={formik.values.Tax}
            className="text-main-color border w-full mt-2 p-0 border-[#A767E0]"
            options={[{title:"Tax 19%",id:19},{title:"Tax 7%",id:7}]}
            optionLabel="title"
            optionValue="id"
          />
          {formik.touched.Tax && formik.errors.Tax ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.Tax}
            </p>
          ) : undefined}
        </div>       
        <div className="w-full mt-2 font-poppins font-normal md:w-[22.3%]   ">
          <label className="">Product Price (€)</label>
          <InputText
            name="Price"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.Price}
            className="text-main-color border w-full mt-2 p-2  font-poppins border-[#A767E0]"
          />
          {formik.touched.Price && formik.errors.Price ? (
            <p className="text-red-500 mt-2  w-full text-[14px]">
              {formik.errors.Price}
            </p>
          ) : undefined}
        </div>
        <div className="w-full   mt-2 font-poppins font-normal md:w-[22.3%]   ">
          <label className="">Delivery Cost (€)</label>
          <InputText
            name="DeliveryPrice"
            placeholder="Delivery Cost"
            onChange={formik.handleChange}
            value={formik.values.DeliveryPrice} 
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
         
          />
          {formik.touched.DeliveryPrice && formik.errors.DeliveryPrice ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.DeliveryPrice}
            </p>
          ) : undefined}
        </div>
        <div className="w-full   mt-2 font-poppins font-normal md:w-[22.3%]   ">
          <label className="">Pickup Cost (€)</label>
          <InputText
            name="PickupPrice"
            placeholder="Pickup Price"
            onChange={formik.handleChange}
            value={formik.values.PickupPrice} 
            className="text-main-color border w-full mt-2 p-2 border-[#A767E0]"
         
          />
          {formik.touched.PickupPrice && formik.errors.PickupPrice ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.PickupPrice}
            </p>
          ) : undefined}
        </div>        
        <div className="w-full  justify-center sm:justify-center md:justify-between lg:justify-between mt-4"> 
          <label className="w-full">Allergians</label>       
          <div className="flex flex-wrap flex-row w-full justify-left">
             <div className="w-[calc(100%-200px)] text-main-color border flex flex-wrap flex-row justify-left border-main-color p-2 rounded-sm h-auto"> 
             {Allergians?.map(item=>{  
             return(  
              <div className="ml-2 flex flex-wrap flex-row justif-left items-center">
               <h1 className="ml-1">{item}</h1>    
                <i onClick={()=>{  
                  let UpdatedArray=[]
                  for(let i=0;i<Allergians?.length;i++){  

                    if(Allergians[i] === item){ 
                       
                    } 
                    else{ 
                      UpdatedArray.push(Allergians[i])
                    }
                  } 
                  setAllergians(UpdatedArray)  
                }} className="ml-1 cursor-pointer pi pi-times text-[12px]"/>
                </div>
             )
              })    
            }          
      
             </div>    
              <Button type="button" onClick={()=>{ 
                setAddItem(prev=>!prev)
              }} icon="pi pi-plus" className="ml-2 w-[150px] bg-main-color p-1 text-white pl-2 pr-2" label="Add New" /> 
                    {formik.touched.Allergians && formik.errors.Allergians ? (
            <p className="text-red-500 mt-2 w-full text-[14px]">
              {formik.errors.Allergians}
            </p>
          ) : undefined}
                 </div>
        </div> 
      </div>
      
      <div className="flex flex-wrap mt-8 flex-row justify-center gap-4 w-full">  
        
        <Button label="Edit" type="button" className="border h-[40px] w-[200px] border-main-color pl-4 pr-4 p-1" />
        <Button label="ADD MORE" type="button" className="border  h-[40px] w-[200px] border-main-color pl-4 pr-4 p-1"/> 
          
         
         <Button label="SAVE And Submit"     loading={loaderShow}
           disabled={loaderShow}
           type="submit" className="border w-[200px] bg-main-color  h-[40px] text-white border-main-color pl-4 pr-4 p-1"/> 
               </div>
      <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
    mt-[70px]
  "   ref={toast} />    
      <Dialog header="Add Allergian" className="font-poppins" headerClassName="text-main-color" visible={addItem} onHide={()=>{ 
          setAddItem(prev=>!prev)
          setAddItemValue("")
        }} >  
         <div className="flex flex-wrap  text-main-color flex-row justify-center">
           <InputText className="w-full border p-1 border-main-color" value={addItemValue} onChange={(e)=>{ 
            setAddItemValue(e.target.value)
           }} />  
            <div className="w-full  flex flex-wrap flex-row justify-center"> 
                <Button  type="button" className="bg-main-color mt-4  pl-1 pr-2 text-white" onClick={()=>{   
                  const items=Allergians?Allergians:[]; 
                     items.push(addItemValue) 
                     setAllergians(items)      
                         setAddItemValue("")
                } }
                 
                label="Add"/>
               </div>   
        </div>  
       
        </Dialog>   
        <Toast className="left-[50%] 
    transform 
    translate-x-[-50%] 
    md:right-[20px] 
    md:left-auto 
    md:transform-none
  "  ref={toast}/>
    </form>
  );
}
