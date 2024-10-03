import { useState, useEffect, useRef } from "react";
import { Sender, SenderDecor } from "../assets";
import { InputText } from "primereact/inputtext";
import Axios from "axios"
import Loader from "../../../../Loaders/Components";
export default function ConnectionMessage({ hideAll, setHideAll, accountactive, toast, conversationUser, token }) {
  const [renderFirst, setRenderFirst] = useState(false)
  const [loader, setLoader] = useState(true)
  const [loggedUserId, setLoggedUserId] = useState(JSON.parse(localStorage.getItem("userData"))?.data?.id)

  const [connectionmessage, setConnectionMessage] = useState([])
  let prevSenderId = null;
  const [messageTosend, setMessageTosend] = useState()
  function forInterval() {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Message/List`, {
      params: { ConversationId: conversationUser?.id }
      , headers: { Authorization: `Bearer ${token}` }
    }
    )
      .then((res) => {
        setConnectionMessage(res?.data?.data)

      }).catch(error => {

      })
  }
  function RenderMessages() {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/Message/List`, {
      params: { ConversationId: conversationUser?.id }
      , headers: { Authorization: `Bearer ${token}` }
    }
    )
      .then((res) => {

        if (res?.data?.data?.length > 0) {
          setConnectionMessage(res?.data?.data)

        }
        else {

        }
        if (!renderFirst) {
          toast.current.show({
            severity: "success",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {res?.data?.message
                  ? res?.data?.message
                  : "Connection Chat Fetched Successfully"}
              </p>
            ),
          })
          setLoader(false)
          setRenderFirst(true)
        }
        setTimeout(() => {
          scrollToBottom()
        }, 1000)


      }).catch(error => {
        if (!renderFirst) {
          setLoader(false)
          toast.current.show({
            severity: "error",
            summary: "Info",
            detail: (
              <p className="font-poppins">
                {error?.response?.data?.message
                  ? error?.response?.data?.message
                  : "Connection Chat Fetching Failed"}
              </p>
            ),
          });
          setRenderFirst(true)
        }
      })
  }
  useEffect(() => {
    let interval;
    if (conversationUser !== undefined) {
      RenderMessages()
      interval = setInterval(forInterval, 4000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [conversationUser])
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    container.scrollTop = container.scrollHeight;
    //  container.scrollIntoView({ behavior: "smooth" }); 
  };

  return (
    <div className={`w-[99%] md:w-[65%] ${accountactive ? "h-[calc(100vh-100px)] md:h-[calc(100vh-270px)]" : "h-[calc(100vh-175px)]"}  overflow-y-auto overflow-y-auto`}>
      <div className="w-full mt-8   flex mt-4   p-0 md:p-1 rounded-md  flex-wrap flex-row justify-between">
        <div className="w-full flex flex-wrap flex-row justify-center">
          <div className="w-full md:w-[230px] flex flex-row flex-wrap  justify-left  " >

            <div className="w-[60px] h-[60px] rounded-md  overflow-hidden">
              <img onError={(e) => {
                e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
              }} src={conversationUser?.image ? conversationUser?.image : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"} className="w-[inherit] h-[auto] transform ml-[50%]  translate-x-[-50%]" />
            </div>

            <div className="ml-5 w-[140px]">
              <h1 className="text-[14px] md:text-[20px] font-[600] text-main-color" >{conversationUser?.name}</h1>
              <h1>{conversationUser?.latestMessage
              }</h1>
            </div>
          </div>
        </div>
      </div>
      <div ref={scrollContainerRef} className="h-[calc(100%-200px)] overflow-y-auto">
        {loader ?
          <div className="flex flex-wrap w-full flex-row justify-center items-center mt-4 mb-4"><Loader /></div> :
          connectionmessage?.length === 0 ? <h1 className="text-main-color w-full text-center mt-4 mb-4">
            Chat Messages Not Found
          </h1> :
            connectionmessage?.map((item, index) => {
              const isSender = !!item?.senderId;
              const showImage = isSender ? item?.senderId !== prevSenderId : item?.img !== prevSenderId;
              prevSenderId = isSender ? item?.senderId : item?.img;

              return (
                <div key={index} className={`w-full  mt-4 flex-wrap flex-row ${item?.senderId === loggedUserId ? "justify-end" : "justify-left"}`}>
                  {isSender ? (
                    <div className={`flex flex-wrap w-full flex-row ${item?.senderId === loggedUserId ? "justify-end" : "justify-left"}`}>
                      {showImage && loggedUserId !== item?.senderId && (
                        <div className="w-[50px] mt-1 h-[50px] rounded-md overflow-hidden">
                          <img
                            src={item?.image ? item?.image : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"}
                            alt="sender"
                            className="w-[inherit] h-[auto] transform ml-[50%] translate-x-[-50%]"
                          />
                        </div>
                      )}
                      <div className={`${showImage && loggedUserId === item?.senderId ? 'mr-2' : showImage && loggedUserId !== item?.senderId ? "ml-2" : loggedUserId === item?.senderId ? 'mt-[-15px] mr-[57px]' : "mt-[-15px] ml-[57px]"}  max-w-[80%]`}>
                        <h1 className={`pl-3 pr-3 text-[14px] font-[400]  rounded-md ${loggedUserId === item?.senderId ? "text-[white] bg-main-color" : "text-main-color  bg-[#F2F2F2]"} mt-2  p-1`}>
                          {item?.message}
                        </h1>
                      </div>
                      {showImage && loggedUserId === item?.senderId && (
                        <div className="w-[50px] mt-1 h-[50px] rounded-md  overflow-hidden">
                          <img
                            src={`${JSON.parse(localStorage.getItem("userData"))?.data?.image ? JSON.parse(localStorage.getItem("userData"))?.data?.image : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"}`}
                            alt="sender"
                            className="w-[inherit] h-[auto] transform ml-[50%] translate-x-[-50%]"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
      </div>
      <div className="w-full mt-8 flex items-center flex-wrap flex-row justify-between">
        <SenderDecor />
        <div className="w-[calc(100%-40px)] rounded-md p-2  border overflow-hidden  flex flex-wrap items-center flex-row justify-between">
          <InputText onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (messageTosend !== "") {
                Axios.post(
                  `${process.env.REACT_APP_BASE_URL}/api/v1/Message/Send`, { conversationId: conversationUser?.id, message: messageTosend }, {
                  headers: { Authorization: `Bearer ${token}` }
                }
                )
                  .then((res) => {


                    setMessageTosend("")
                    forInterval()
                    setTimeout(() => {
                      scrollToBottom()
                    }, 3000)

                  }).catch(error => {


                  })
              }
            }
          }} value={messageTosend} onChange={(e) => {
            setMessageTosend(e.target.value)
          }} placeholder="Type a message" className="h-[40px] w-[calc(100%-40px)]" />
          <div onClick={() => {
            if (messageTosend !== "") {
              Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/Message/Send`, { conversationId: conversationUser?.id, message: messageTosend }, {
                headers: { Authorization: `Bearer ${token}` }
              }
              )
                .then((res) => {


                  setMessageTosend("")
                  forInterval()
                  setTimeout(() => {
                    scrollToBottom()
                  }, 3000)

                }).catch(error => {


                })
            }
          }}>
            <Sender />
          </div>
        </div>
      </div>
    </div>
  )
}