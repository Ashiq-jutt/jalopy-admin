import { Button } from 'primereact/button'
import React from 'react'
import { AdvantagesOfJalopay, Airbnb, AppleStore, Asana, BoostBusiness, Facebook, FastService, FreeRide, GooglePlayStore, Hubspot, IncreaseSale, JiraWork, Linkedin, PartnerWorkShop, PromotionalMaterial, Safe, Salesforce, Twitter, Youtube } from '../../../../utils/adminDashboardSlice/adminDashboardSlice'
import { useNavigate } from 'react-router-dom'
function Webheader() {
  let navigate = useNavigate()
  return (
    <div className='font-poppins '>
      <div className='w-full flex flex-wrap flex-row justify-center items-center '>
        <div className='w-full max-w-[1500px] font-poppins flex mt-4 flex-wrap flex-row gap-2 justify-around items-center' >

          <img className="w-full md:w-[45%] h-auto " src="/Webheader.png" />

          <div className='w-full md:w-[45%]'>
            <h1 className=' md:text-[40px] text-[20px] text-center text-[#CD9DF8]'>Make Everyday Better With <span className='text-main-color'>Jalopay.Pro</span></h1>
            <h1 className='mt-5 text-center text-[#CD9DF8]'> <span className='text-main-color'>Download The App</span></h1>
            <div className='w-full flex flex-wrap flex-row justify-center gap-4 mt-4 '>
              <Button icon={<GooglePlayStore />} className='pl-3 w-[170px] p-1 bg-main-color text-white' label="Download Now" />
              <Button icon={<AppleStore />} className='pl-3 w-[170px] p-1 bg-main-color text-white' label="Download Now" />

            </div>
            <h1 className='w-full text-center mt-8 mb-8 text-[24px] text-main-color'>OR</h1>
            <div className='w-full flex flex-wrap flex-row justify-center gap-4 mt-4 '>
              <Button onClick={() => {
                navigate("/Login")
              }} icon="pi pi-globe" className='pl-3 w-[200px] p-1 bg-main-color text-white' label="Continue With Web" />

            </div>
          </div>


        </div>
      </div>
      <div className='w-full flex flex-wrap flex-row justify-center'>
        <div className='w-full max-w-[1500px] flex flex-wrap flex-row mt-[40px] justify-center gap-8 md:gap-20 items-center'>
          <div className='w-[12%]'>
            <Airbnb />
          </div>
          <div className='w-[12%]'>
            <Salesforce />
          </div>
          <div className='w-[12%]'>

            <Asana />
          </div>
          <div className='w-[12%]'>
            <JiraWork />
          </div>
          <div className='w-[12%]'>
            <Hubspot />
          </div>
        </div>
      </div>
      <h1 className='w-full text-center mt-8  text-main-color md:text-[30px] text-[20px]  weight-[400]'>Why Jalopay.Pro ?</h1>
      <div className='w-full flex flex-wrap flex-row mt-8 justify-center gap-20 items-center'>
        <div className='w-[200px]'>
          <FreeRide />
        </div>
        <div className='w-[200px]'>
          <IncreaseSale />
        </div>
        <div className='w-[200px]'>
          <FastService />
        </div>
        <div className='w-[200px]'>
          <Safe />
        </div>
      </div>
      <div className='w-full flex flex-wrap p-4 pt-20 pb-20 bg-main-color mt-20 flex-row justify-center items-center'>
        <div className='w-full max-w-[1700px] '>
          <h1 className='w-full text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[white]  weight-[400]'>Advantages Of Jalopy.Pro</h1>
          <div className='w-full  flex flex-wrap flex-row mt-14 justify-center gap-14 md:gap-20 items-center'>
            <div className='w-[280px] md:w-[350px]'>
              <PartnerWorkShop />
            </div>
            <div className='w-[280px] md:w-[350px]'>
              <BoostBusiness />
            </div>
            <div className='w-[280px] md:w-[350px]'>
              <PromotionalMaterial />
            </div>

          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap flex-row justify-center items-center '>
        <div className='w-full max-w-[1500px] font-poppins flex mt-14 flex-wrap flex-row gap-10 md:gap-2 justify-around items-center' >

          <img className="w-[70%]  block md:hidden md:w-[45%] h-auto " src="/GrowBusiness.png" />


          <div className='w-[95%] md:w-[45%] flex flex-wrap flex-row justify-start'>

            <h1 className=' text-[20px] text-main-color md:text-[40px] w-full'>Grow Your Business</h1>
            <p className='text-main-color md:w-[400px] w-full mt-[20px] md:mt-[40px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='w-full '>
              <Button label="Join us" className='mt-[20px] md:mt-[100px] md:pt-5 pt-2 pb-2 md:pb-5 md:pl-14 pl-5 pr-5 rounded-xl md:pr-14 bg-main-color text-white text-[20px]' />
            </div>
          </div>     <img className="w-full  hidden md:block md:w-[45%] h-auto " src="/GrowBusiness.png" />



        </div>
      </div>
      <div className='w-full bg-main-color mt-20 flex flex-wrap flex-row justify-center  '>
        <div className='w-full max-w-[1500px] bg-main-color font-poppins flex mt-14 flex-wrap flex-row gap-10 md:gap-2 justify-around ' >
          <div className='w-[95%] md:w-[45%] pl-6'>
            <div className='w-full'>
              <img className="h-[auto] w-[25%]" src="/FooterLogo.png" />
            </div>
            <p className='mt-8 text-white w-full md:w-[80%]'>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            </p>
            <div className='w-full flex mt-4 flex-wrap flex-row justify-start items-center gap-4'>
              <Facebook />
              <Twitter />
              <Linkedin />
              <Youtube />

            </div>
          </div>
          <div className='w-[4%] hidden md:block border-r '>

          </div>
          <div className='md:w-[45%] w-[95%] text-white weight-[200] justify-between md:justify-start flex flex-wrap flex-row '>
            <div className='w-[100px] md:w-[200px] flex flex-col gap-4'>
              <h1 className='text-[20px] tracking-wide'>About</h1>
              <h1 className='text-[15px] font-thin tracking-wide' >About US </h1>
              <h1 className='text-[15px] font-thin tracking-wide' >Location </h1>
              <h1 className='text-[15px] font-thin tracking-wide'>What's New </h1>

            </div>
            <div className='w-[100px] md:w-[200px] flex flex-col gap-4'>
              <h1 className='text-[20px] tracking-wide'>Driver</h1>
              <h1 className='text-[15px] font-thin tracking-wide' >Help Center</h1>
              <h1 className='text-[15px] font-thin tracking-wide' >Drive With Us</h1>
              <h1 className='text-[15px] font-thin tracking-wide'>Deliver With Us</h1>

            </div>
            <div className='w-[100px] md:w-[200px] flex flex-col gap-4'>
              <h1 className='text-[20px] tracking-wide'>Seller</h1>
              <h1 className='text-[15px] font-thin tracking-wide' >Help Center </h1>
              <h1 className='text-[15px] font-thin tracking-wide'>What's New </h1>

            </div>

          </div>
        </div>
          <div className='w-full bg-white mt-8 mb-2 bg-white flex flex-wrap-wrap justify-center'>
            <h1 className=' w-full max-w-[1500px] text-[12px] md:text-[20px] text-center rounded-lg text-main-color p-2 md:p-6'>FULL COPYRIGHT & DESIGN BY @jalopy.pro-2023</h1>
          </div>
      </div>
    </div>
  )
}

export default Webheader