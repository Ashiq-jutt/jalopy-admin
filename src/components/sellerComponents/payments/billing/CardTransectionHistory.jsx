const CardTransectionHistory = ({Newesttransactions}) => { 
  return (
    <div >  
      <h1 className="mt-4 text-[21px] font-normal">Newest</h1>   
       {(Newesttransactions[0].newest).map((item,index)=>{ 
           return ( 
            <div className="flex items-center flex-row flex-wrap justify-around mt-5">
                    
                   { 
                     item.increase ? <i className="border rounded-full p-2 border-red-500 text-red-500 pi pi-angle-down"></i>:<i className="rounded-full p-2 border border-green-500 pi pi-angle-up text-green-500"></i>
                   }     
                    
                    <div>
                 <h1>{item.label}</h1>  
                    <h1>{item.time}</h1>
                  </div> 
                  { 
                    item.increase ? <div className="text-green-500 flex flex-wrap flex-row items-center justify-left">  
                       <i className="pi pi-plus"></i> 
                       <h1 className="ml-2">${item.amount}</h1>
                      </div>: <div className="text-red-500  flex flex-wrap flex-row items-center justify-left">  
                       <i className="pi pi-minus"></i> 
                        <h1 className="ml-2" >${item.amount}</h1>
                      </div>
                        
                   }
            </div> 
           )
       })
      
}   
<h1 className="mt-4 text-[21px] font-normal">Yesterday</h1>   
       {(Newesttransactions[0].yesterday).map((item,index)=>{ 
           return ( 
            <div className="flex items-center flex-row flex-wrap justify-around mt-5">
                    
                   { 
                     item.increase ? <i className="border rounded-full p-2 border-red-500 text-red-500 pi pi-angle-down"></i>:<i className="rounded-full p-2 border border-green-500 pi pi-angle-up text-green-500"></i>
                   }     
                    
                    <div>
                 <h1>{item.label}</h1>  
                    <h1>{item.time}</h1>
                  </div> 
                  { 
                    item.increase ? <div className="text-green-500 flex flex-wrap flex-row items-center justify-left">  
                       <i className="pi pi-plus"></i> 
                       <h1 className="ml-2">${item.amount}</h1>
                      </div>: <div className="text-red-500  flex flex-wrap flex-row items-center justify-left">  
                       <i className="pi pi-minus"></i> 
                        <h1 className="ml-2" >${item.amount}</h1>
                      </div>
                        
                   }
            </div> 
           )
       })
      
}
    </div>
  );
};

export default CardTransectionHistory;
