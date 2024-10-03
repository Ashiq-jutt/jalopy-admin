import React,{useState,useEffect} from 'react'
import Chart from 'react-google-charts';  
import Axios  from 'axios';  
import moment from 'moment';
import CommonLoaderBlue from '../../Common/Components/Loader/LoaderBlue';
import { Dropdown } from 'primereact/dropdown';
export default function ProUsersChart({token,toast}) {   
  
   const [filter,setFilter]=useState(new Date().getFullYear()) 
   const [firstrender,setFirstRender]=useState(false)
  const [data,setData] =useState([
    ['Month', 'Users'],
  ])
  
  const options = {
    chart:{ 
       title:"Hello"
    },
    annotations: {
      lineDashStyle: [4, 4], // Specify the dash and gap length (e.g., [4, 4] for dashed)
    },
         
    vAxis: {
      textStyle: {
        color: '#A767E0', // Set your desired color here
      },
      viewWindow: {
        min: 0 // Specify the minimum visible value for the vertical axis
      },
      gridlines: { // Show vertical gridlines
        color: 'lightgrey', // Adjust the color of vertical gridlines
      },
    },   
    legend:"none",
    hAxis: { 
      gridlines: { count: 3,baselineColor: 'transparent',  }, // Hide horizontal gridlines
      baselineColor: '#A767E0', 
      format: 'dd-MM-yy', // Format for the date axis
      baselineColor: 'transparent', 
      color:"#A767E0",
      gridlines: {
        color: 'transparent', // Hides the horizontal gridlines
      }, 
      textStyle: {
        color: '#A767E0', // Set your desired color here
      },
      textPosition: 'out',
 
    },  
      areaOpacity: 0.3, 
      // Adjust the opacity of the area under the line
     
     
      curveType: 'function', // Use 'function' for a smooth line
      colors: ['#A25EDF'], // Specify the custom line color here
      fontName: 'Poppins, sans-serif', // Set the desired font-family
   
      fontName: 'Inter', // Change to your desired font family
      chartArea: { 
        width: '80%', // Increase this to make the chart take up more width
        height: '80%' // Adjust this as needed
       , bottom: 50, 
       top:20,
      },
      legend: { position: 'none' },
    
    
  };
  const [loader,setLoader]=useState(true)
  useEffect(()=>{   
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/AdminDashboard/Users/${filter}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res=>{     
     let data3= res?.data?.data?.reduce((acc, user) => {
        const month = moment(new Date(user.created)).format('MMMM');
        if (!acc[month]) {
          acc[month] = 0;
        }
        ++acc[month];
        return acc;
      }, {}); 
     
     let newchartdata= [
        ['Month', 'Users']] 
      Object.keys(data3).map(key=>{ 
        let arr=[`${key}`,data3[key]] 
        newchartdata.push(arr)
      }) 
      setData(newchartdata)
       
      setLoader(false)
    //setChartData(res?.data?.data) 
       if(!firstrender){      
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: 
            <p className="font-poppins">
              {res?.data?.Message
                ? res?.data?.Message
                : "Users Data  Successfully Fetched"}
            </p>
          
        });  
       
        setFirstRender(true)      
       } 
 
       }).catch(err=>{ 
        if(!firstrender){   
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: 
              <p className="font-poppins">
                {err?.response?.data?.Message
                  ? err?.response?.data?.Message
                  : "Users Data Fetching Failed"}
              </p>
            
          });
          setFirstRender(true)         
         }
       })},[filter]) 
    
  return (
    <div className='w-full md:h-[400px] shadow-custom mb-4 overflow-hidden rounded-lg mt-[350px] md:mt-0  '> 
    
       <div className='flex flex-row flex-wrap items-center justify-between'>
      <h1 className='font-medium  font-poppins md:text-[1.5rem]  text-main-color p-4 '>Jalopay.Pro App Users</h1>           
      <div className='jalopayuserdropdown md:mr-4 p-2 flex w-full md:w-[200px]'>   
        <Dropdown value={filter} onChange={(e)=>{ 
          setFilter(e.value)
        }} placeholder='Year'  optionLabel='label' optionValue='value' className='w-full  text-main-color border border-[#EEEEEE] rounded-md bg-[#FBF8FF]' options={[...(Array.from({ length: new Date().getFullYear() - 1933 + 1 }, (_, index) => {
          const year = 1933 + index;
          return { label: year.toString(), value: year.toString() };
        }))]}/>
        </div>   
          
     </div>   
    
      { loader ? <div className="flex flex-wrap flex-row  mt-4 mb-4 justify-center items-center w-full h-full"><CommonLoaderBlue/></div>:  
       data?.length > 0 ? 
     <div className=' md:h-[calc(100%-60px)]  flex flex-wrap flex-row justify-center md:items-center w-full'>
      <Chart
      chartType="AreaChart"
      width="100%"
      height="auto"
      data={data}
      options={options}
    />
    </div>      
    : 
     <div className='w-full h-[calc(100%-100px)] flex flex-wrap flex-row justify-center items-center '> 
    <p>Data Not Found</p> 
     </div>  
  }  
    </div>
  )
}

