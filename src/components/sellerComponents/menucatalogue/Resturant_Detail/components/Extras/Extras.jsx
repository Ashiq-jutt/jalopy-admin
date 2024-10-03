import React,{useState} from "react" 
import { InputSwitch } from "primereact/inputswitch" 
import { DataTable } from "primereact/datatable"  
//import { Paginator } from "primereact/paginator"      
import { Dialog } from "primereact/dialog"
import AddNewProduct from "../Dialogs/Add_New_Product"
import { Button } from "primereact/button";
import { Column } from "primereact/column"
import EditViewAddDrinks from "./components/edit_view_addproduct/edit_view_addproductmain";
export default function Extras(){     
    const [aiDrinkData,setAiDrinkData]=useState(null)  
    const [addNewProductVisibility,setAddNewProductVisibility]=useState(false)
     const [showAiDetailView,setShowAiDetailView]=useState(false)
    const drinksData=[{ 
           id:"0028", 
           img:"/drinks.png",  
           
   category:"Fast Food",
           title:"Sprite", 
           stock:"In Stock", 
           price:'€3,99',
           status:true, 
           description:"A  Marvellous Tast You Will Enjoy It",
           deliverycost:"€1,99"
,   pickupcost:"€1,99", 
allergian:"No oNe Currently"
    },{ 
      id:"0028", 
      img:"/drinks.png", 
      title:"Sprite", 
      stock:"In Stock", 
      price:'€3,99',
      status:true, 
      description:"A  Marvellous Drink You Will Enjoy It",
      deliverycost:"€1,99", 
      
   category:"Fast Food", 
    pickupcost:"€1,99", 
allergian:"No oNe Currently"
},{ 
  id:"0028", 
  img:"/drinks.png", 
  title:"Sprite", 
  stock:"In Stock", 
  price:'€3,99',
  status:true, 
  description:"A  Marvellous Drink You Will Enjoy It",
  deliverycost:"€1,99" , 
    pickupcost:"€1,99",  
   category:"Fast Food",
allergian:"No oNe Currently"
},{ 
  id:"0028", 
  img:"/drinks.png", 
  title:"Sprite", 
  stock:"In Stock",    
  category:"Drinks",
  price:'€3,99', 
  
  category:"Fast Food",
  status:true, 
  description:"A  Marvellous Drink You Will Enjoy It",
  deliverycost:"€1,99"
,   pickupcost:"€1,99", 
allergian:"No oNe Currently"
},
    
    ]
     return ( 
        <div className="overflow-x-hidden">    
            <Button label="SAUCE" className="bg-main-color mt-2 w-[150px] text-white border border-main-color font-normal ml-[100%] transform translate-x-[-160px]" ></Button> 
            
            <Button label="EXTRAS" className=" w-[150px] text-main-color border border-main-color font-normal ml-[100%] transform translate-x-[-160px] mt-2"></Button>
            <Button label="Add New " onClick={()=>{ setAddNewProductVisibility(prev=>!prev)}} icon="pi pi-plus" iconPos="right"  className="pr-5 pl-5 w-[150px] text-main-color border border-main-color font-normal ml-[100%] transform translate-x-[-160px] mt-2"></Button>
       
       {showAiDetailView ? <EditViewAddDrinks aiDrinkData={aiDrinkData}/>: <DataTable
          value={drinksData}
          size="small"
          resizableColumns
          paginator
          rows={10}
          rowsPerPageOptions={[25, 50]}
          emptyMessage="No customers found."
          style={{ backgroundColor: "white"}} 
        onRowClick={(rowData)=>{    
            
          setAiDrinkData(rowData.data) 
          setShowAiDetailView(prev=>!prev) 
          
        }}       
        rowClassName="cursor-pointer"
          className="  w-[99%] p-4 ml-2  mt-2 overflow-x-hidden all-customers text-main-color font-poppins "
        >
          {/* <Column selectionMode="multiple" style={{ width: "3em" }} /> */}
          <Column
            header="ID"  
            headerClassName="rounded-l-sm  text-white font-normal bg-main-color"
            className="text-main-color font-normal"
            field="id"
            
          ></Column>
          <Column header="Image" 
            headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="img" body={()=>{ 
              return( 
                <div className="flex flex-wrap flex-row overflow-hidden w-[50px] rounded-full h-[50px] jusitfy-center items-center "> 
                              <img onError={(e)=>{ 
    e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
  }}src="https://www.foodandwine.com/thmb/_hz1-1jxHmNJxNLZxIjlOs2QQ3E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg"/>
                </div>
              )
            }}></Column>
          <Column header="Title"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="title"></Column>  
          <Column header="Stock/Out"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="stock"></Column>  
          
           <Column header="Status" body={(rowData)=>{return( 
               <div className={` flex items-center   justify-left`}>
               <InputSwitch
                 checked={rowData.status}
                 className="" 
                
               /> 
             </div>
          )}} headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="status"></Column>
             <Column header="Price"  headerClassName="text-white font-normal bg-main-color" className="text-main-color font-normal" field="price"></Column>  
         
          <Column header="Actions"  headerClassName=" font-normal rounded-r-sm  text-white bg-main-color" className="text-main-color font-normal" field="action" body={tableActions}></Column>
        </DataTable>     } 
        <Dialog 
        header="Add New Product"   
        headerClassName="text-main-color"
        style={{width:"80vw"}}
         visible={addNewProductVisibility} 
         onHide={()=>{ 
           setAddNewProductVisibility(false)
         }}
        > <AddNewProduct/> </Dialog>
        </div>
     )
}   
const tableActions = (rowData) => {
    return (
      <div className="w-full  flex flex-wrap flex-row justify-left"> 
          {" "}
          <Button  
          onClick={()=>{  
            /*
             setResturantDetailView(rowData) 
            setShowResturantDetail(prev=>!prev) 
            */
          }}
            icon="pi pi-pencil"
            className="w-[20px] h-[20px]  text-main-color "
          />
          
      </div>
    );
  };