
export default function Invoices(){  
     const invoicesData=[{ 
     label:"Drafts", 
     number:9,  
     invoicenumber:"121232323"
     },{ 
      label:"Awaiting Payments", 
      number:8, 
      
     invoicenumber:"121232323"
     },{ 
        label:"Awaiting Approval", 
        number:8, 
        
     invoicenumber:"121232323"
       },{ 
        label:"Overdue", 
        number:4, 
        
     invoicenumber:"121232323"
       } ]
    return(  
         <div className="mt-4 font-poppins font-normal text-main-color "> 
             <h1 className="font-normal text-[20px]">Invoices </h1> 
              <div className="bg-[#F1E9FE] p-4 rounde-md mt-4"> 
                <div className="flex flex flex-wrap flex-row justify-evenly"> 
                   { 
                     invoicesData.map(item=>{return( 
                         <div className="w-[200px]"> 
                             
                            <p>{item.label} ({item.number})</p> 
                         </div>
                     )})
                    } 

                </div> 
                <div className="flex flex mt-4 flex-wrap flex-row justify-evenly"> 
                   { 
                     invoicesData.map(item=>{return( 
                         <div className="w-[200px]"> 
                             
                            <p>{item.invoicenumber}</p> 
                         </div>
                     )})
                    } 
                    
                </div>
              </div>
         </div>
    )
}