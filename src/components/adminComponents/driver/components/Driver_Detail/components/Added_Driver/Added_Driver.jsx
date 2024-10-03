import { InputText } from "primereact/inputtext" 
import { useFormik } from "formik"
import { Button } from "primereact/button"
export default function AddedDriver(){  
    const formik=useFormik({ 
        initialValues:{ 
            name1:"", 
            lastname1:"",  
            name2:"", 
            lastname2:"",  
            name3:"", 
            lastname3:"", 
        } 
    })
     return( 
         <div className="flex w-full text-main-color p-4 flex-row flex-wrap justify-around ">  
            { [0,1,2].map((item,index)=>{ 
                 return(  <>
                     <div>   
                 
                         </div>  
                          {  
                          index === 0 ?<><div  className="flex mt-4 items-center  flex-wrap flex-row justify-between w-full">
                          <p className="border border-main-color pl-[5px] rounded w-[25px] h-[25px]">{index+1}</p> 

                          <div> 
                             <label >  
                                Name
                                </label>  
                                 <InputText  className="mt-2 text-black border w-full mt-2 p-2" placeholder="Name" name="name1" value={formik.values.name1} onChange={formik.handleChange}/>
                            </div>   
                            <div> 
                             <label >  
                                Last Name
                                </label>  
                                 <InputText 
               className="mt-2 text-black border w-full mt-2 p-2" placeholder="Last Name" name="lastname1" value={formik.values.lastname1} onChange={formik.handleChange}/>
                            </div>  
                            
                            <Button  className="text-white bg-main-color p-1 pl-2 pr-2 "> Delete</Button> 
                            </div>  
                            <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete"
          className="border border-main-color mt-1 text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button
          label="Inquiry"
          className="border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button  
          
          label="Edit"
          className={`border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          label="Approve" 
          
          className={`border border-main-color mt-1   rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
                             </>: index === 1 ? <>  <div  className=" mt-4 flex items-center  flex-wrap flex-row justify-between w-full">
                                       <p className="border border-main-color pl-[5px] rounded w-[25px] h-[25px]">{index+1}</p> 

                            <div> 
                               <label >  
                                  Name
                                  </label>  
                                   <InputText className="mt-2 text-black border w-full mt-2 p-2" placeholder="Name" name="name2" value={formik.values.name2} onChange={formik.handleChange}/>
                              </div>   
                              <div> 
                               <label >  
                                  Last Name
                                  </label>  
                                   <InputText className="mt-2 text-black border w-full mt-2 p-2" placeholder="Last Name" name="lastname2" value={formik.values.lastname2} onChange={formik.handleChange}/>
                              </div>    
                                <Button  className="text-white bg-main-color p-1 pl-2 pr-2 "> Delete</Button>
                              </div>        
                              <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete"
          className="border border-main-color mt-1 text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button
          label="Inquiry"
          className="border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button  
          
          label="Edit"
          className={`border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          label="Approve" 
          
          className={`border border-main-color mt-1   rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
                               </>
                             :<> <div  className="flex mt-4 items-center  flex-wrap flex-row justify-between w-full">
                                       <p className="border border-main-color pl-[5px] rounded w-[25px] h-[25px]">{index+1}</p> 

                             <div> 
                                <label >  
                                   Name
                                   </label>  
                                    <InputText className="mt-2  text-black border w-full mt-2 p-2" placeholder="Name" name="name3" value={formik.values.name3} onChange={formik.handleChange}/>
                               </div>   
                               <div> 
                                <label >  
                                   Last Name
                                   </label>  
                                    <InputText className="mt-2 text-black border w-full mt-2 p-2" placeholder="Last Name" name="lastname3" value={formik.values.lastname3} onChange={formik.handleChange}/>
                               </div>   
                               
                               <Button  className="text-white bg-main-color p-1 pl-2 pr-2 "> Delete</Button>
                               </div>  
                               <div className="flex mt-4 flex-wrap font-poppins font-normal w-[100%] justify-evenly flex-row">
        <Button
          label="Delete"
          className="border border-main-color mt-1 text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button
          label="Inquiry"
          className="border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2"
        />
        <Button  
          
          label="Edit"
          className={`border border-main-color mt-1  text-main-color rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
        <Button
          label="Approve" 
          
          className={`border border-main-color mt-1   rounded-lg w-[150px] font-normal p-1 pl-2 pr-2`}
        />
      </div>
                               </>

            }
                          </>
                 )
            })
}
            </div>
     )
}