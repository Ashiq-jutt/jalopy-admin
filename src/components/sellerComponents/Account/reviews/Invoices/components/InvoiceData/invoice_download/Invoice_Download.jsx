import html2pdf from 'html2pdf.js'
import { InputText } from 'primereact/inputtext' 
import {format,parseISO} from "date-fns" 
import Axios from 'axios' 
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
export default function InvoiceDownload({token,refreshInvice ,ridePartnerId,setCurrentInvoice,invoiceData}){    
   
     let formref=useRef()  
     const [orderData,setOrderData]=useState()
    async function PrintInvoice(){ 
        const form=formref.current  
      html2pdf(form,{
        margin: 0,
        filename: `Invoice.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2,     width: form.scrollWidth, // Ensure the canvas matches the form width
            height: form.scrollHeight // Ensure the canvas matches the form height
        },
        pagebreak: { mode: 'avoid-all', before: '#page2el' },
        jsPDF: { unit: 'px', format: [form.scrollWidth,form.scrollHeight], compressPdf: true, orientation: 'portrait' }
    })
      

     }    
     useEffect(()=>{  
        if(invoiceData !== null){ 
           
     
    
         Axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/Order/Details/${invoiceData?.id}`,{ headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{ 
                setOrderData(res?.data?.data) 
                 setTimeout(()=>{
                PrintInvoice() 
                 },500)
          }).catch((error)=>{       
        
          })    
        }
     },[invoiceData,refreshInvice])
     return( 
           <div ref={formref}   className='font-poppins text-main-color  fixed top-0 z-[-11] w-[250px] mb-10  '  >
            <p className='text-center font-poppins w-full font-normal  text-[10px]'>Resturant</p> 
            <p className='text-center font-poppins w-full font-normal  text-[10px]'>{orderData?.shopName}</p>
            <p className='text-center font-poppins w-full  font-normal text-[8px]'>{orderData?.shopAddress}</p> 
            <p className='text-center font-poppins w-full  font-normal text-[8px]'>Tax No  &nbsp;&nbsp;{orderData?.c}</p> 
             <div className='flex flex-wrap flex-row justify-beteen p-3 text-[8px] items-center'> 
                 <p className='w-[50%] mt-2'>#0001</p> 
                 <p className='w-[50%] text-right mt-2'>{moment(orderData?.createdAt).format('DD-MM-YY')}</p> 
                 <p className='w-[50%] mt-2'>Invoice</p> 
                 <p className='w-[50%] text-right mt-2'>{orderData?.id}</p>  
                 <p className='w-[50%] mt-2'>Order Status</p> 
                 <p className='w-[50%] text-right mt-2'>{orderData?.status}</p>   
                 <p className='w-[50%] w-full text-center mt-2'>Resturant ID. {orderData?.shopId}</p>
             </div> 
             <div className='w-full p-3 flex flex-wrap flex-row justify-between'> 
               {
               orderData?.orderItems?.map(item=>{ 
                return ( 
                    <div className='w-full flex flex-wrap  flex-row justify-between items-center text-[8px]'> 
                       <p className='w-[33%]'> {item?.qty} x {item?.name}</p> 
                       <p className='w-[33%] text-center'> {item?.unitPrice} </p> 
                       <p className='w-[33%] text-right'>{item?.unitPrice * item?.qty}</p>
                     </div>
                )
               })
               }  
                <p className='w-[33%] text-[8px] text-left'> Sub Total </p> 
                <p className='w-[33%] text-right text-[8px]'>{orderData?.totalAmount}</p>
                 <div className='w-full flex flex-wrap flex-row justify-between'>
                <p className='w-[33%] text-[8px] text-left'>Net</p> 
                <p className='w-[33%] text-right text-[8px]'>{orderData?.grandTotal}</p>
                 </div> 
                 <div className='w-full flex flex-wrap flex-row justify-between'>
                <p className='w-[33%] text-[8px] text-left'>Vat</p> 
                <p className='w-[33%] text-right text-[8px]'>{orderData?.taxAmount}</p>
                </div>
             </div>    
             
              <div className='w-full border-b border-main-color'></div> 
              <p className='w-full text-[8px] text-main-color  text-center mb-10'>Thanks For Your Visit</p>  
            
           </div>
              
     )
}