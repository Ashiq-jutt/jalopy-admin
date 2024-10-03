import Axios from "axios"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import moment from 'moment';
import Loader from "../../../../Loaders/Components";
export default function AllConnections({ hideAll, setHideAll, accountactive, toast, token, setConversationUser }) {
  const [connections, setConnections] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Message/ConversationList`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setLoader(false)
        if (res?.data?.data?.length > 0) {
          let res2 = res?.data?.data
          res2[0].active = true
          setConnections(res2)
          setConversationUser(res2[0])
        }
        else {

        }
        toast.current.show({
          severity: "success",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {res?.data?.message
                ? res?.data?.message
                : "Connection List Fetched Successfully"}
            </p>
          ),
        })
      }).catch(error => {
        setLoader(false)
        toast.current.show({
          severity: "error",
          summary: "Info",
          detail: (
            <p className="font-poppins">
              {error?.response?.data?.message
                ? error?.response?.data?.message
                : "Connection List Fetching Failed"}
            </p>
          ),
        });
      })
  }, [])
  return (
    <>
      {
        hideAll ? <i onClick={() => {
          setHideAll(false)
        }} className="pi left-[8px] absolute text-main-color pi-bars md:hidden" /> :
          ""
      }
      <div className={`${hideAll ? "hidden" : "w-[98%]"} md:w-[33%] md:block absolute   md:relative z-10 ${accountactive ? "h-[calc(100vh-100px)] md:h-[calc(100vh-270px)]" : "h-[calc(100vh-175px)]"} overflow-y-auto   bg-[white] `}>
        <i onClick={() => {
          setHideAll(true)
        }} className={` ${!hideAll ? "" : ""}  md:hidden text-main-color pi pi-arrow-left`} />
        <div className=" md:mt-8 pl-1 pr-1 shadow-sm pb-4 flex-wrap items-center font-poppins text-main-color font-normal flex-row flex justify-between">
          <div className="flex  w-full flex-wrap flex-row items-center  justify-left">

            <h1 className="font-[600] text-[14px] md:text-[20px] tracking-wide ">Chat History</h1>
            <i className="ml-2 pi pi-angle-down"></i>
            <h1 className=" ml-5 bg-[#F2F2F2] flex flex-wrap justify-center items-center w-[24px] h-[24px] rounded-full "><p className="mt-[1px]">{connections?.length}</p></h1>
          </div>

          <div className=" bg-[#F3F3F3] rounded-md w-full mt-4 p-4 flex flex-wrap flex-row items-center justify-between">
            <h1 className="w-[80px] text-[rgba(0,0,0,.4)] text-[14px] text-main-color opacity-[40%] font-[400]">Search</h1>
            <InputText placeholder="Search Messages" className=" bg-[#F3F3F3] opacity-[40%] text-main-color text-[14px] font-[14px] h-[100%]  w-[calc(100%-80px)]" />
          </div>
          {
            loader ? <div className="flex flex-wrap w-full flex-row justify-center items-center mt-4 mb-4"><Loader /></div> :
              connections?.length === 0 ? <h1 className="text-main-color w-full text-center mt-4 mb-4">
                Chat Not Found
              </h1> :
                connections.map((item, index) => {
                  return (
                    <div onClick={() => {
                      let connectioion = []
                      for (let i = 0; i < connections.length; i++) {
                        if (connections[i].id === item?.id) {
                          let obj = connections[i]
                          obj.active = true
                          connectioion.push(obj)
                        }
                        else {
                          let obj = connections[i]
                          obj.active = false

                          connectioion.push(obj)
                        }
                      }
                      setConnections(connectioion)
                      setConversationUser(item)
                      setHideAll(true)
                    }} className={`${item?.active ? "bg-[rgb(217,223,230)] text-main-color" : ""} p-1 rounded-md  w-full cursor-pointer flex mt-4 flex-wrap flex-row justify-between`}>
                      <div className={`w-[60px] h-[60px] rounded-md   overflow-hidden`}>
                        <img onError={(e) => {
                          e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
                        }}


                          src={item.image ? item?.image : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"} className="w-[inherit] h-[auto] transform ml-[50%]  translate-x-[-50%]" />
                      </div>
                      <div className="font-semibold w-[calc((100%-65px)*0.50)]">
                        <h1 className="text-[14px] font-[600]">{item.name}</h1>
                        <h1 className="text-[12px] font-[600]">{item.lastMessage
                        }</h1>
                      </div>
                      <h1 className={`text-main-color font-[600] text-[14px] opacity-[0.3] w-[calc((100%-65px)*0.40)]`}>{moment(item?.lastMessageDateTime).format('DD-MM-YY [at] HH:mm')}</h1>
                    </div>
                  )
                })
          }
        </div>
      </div>
    </>
  )
}