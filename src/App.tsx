import { ChatClient, ChatMessage } from "@twurple/chat";
import { getNewChatClient } from "./chat";
import { BrowserRouter, useLocation, useParams, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import MessageFull from "./MessageFull";

export type CompressedChatMessage = {
  channel: string,
  user: string,
  text: string,
  msg: ChatMessage,
};

function App() {
  const [searchParams, getSearchParams] = useSearchParams()
  const messageRefArray = useRef<CompressedChatMessage[]>([])
  const checkedPrevUser = useRef<Boolean[]>([])
  const [messageArray, setMessageArray] = useState<CompressedChatMessage[]>([])
  const channelRef = useRef<string>("")
  const [channel, setChannel] = useState<string>("")
  function getChannel() : string {
    return searchParams.get("channel") ?? "ERROR_NO_CHANNEL_SET"
  }

  const MAIN_CHAT_CLIENT = getNewChatClient(channel)
  const ALWAYS_TRUE = true

  useEffect(() => {
    const myChannel = getChannel()
    channelRef.current = myChannel
    setChannel(myChannel)
  }, [])

  function check_for_channel() : Boolean {
    return !(channel == "ERROR_NO_CHANNEL_SET")
  }

  function check_if_prev_same_usr(user: string) : Boolean {
    const array = messageRefArray.current
    const last = array[array.length-1]
    if (last === undefined) return false;
    return user == last.user
  }

  useEffect(() => {
    if (!channel || channel === "ERROR_NO_CHANNEL_SET") return;
    
    MAIN_CHAT_CLIENT.connect()
    MAIN_CHAT_CLIENT.onMessage((channel: string, user: string, text: string, msg: ChatMessage) => {
      const cm: CompressedChatMessage = { channel, user, text, msg }
      console.log(check_if_prev_same_usr(user))
      checkedPrevUser.current.push(check_if_prev_same_usr(user))
      messageRefArray.current.push(cm)
      setMessageArray(oldArray => [...oldArray, cm])
    })
  }, [channel])  

  if (!check_for_channel()) return <>Add A Channel In The URL Using the ?channel=[YOUR_CHANNEL_NAME]</>


  return (
    <>
      <div className="all-messages-container">
        <h1>Connected to {channel}</h1>
        {
          messageArray.map(
            (message, index) => {
              return (
                <MessageFull chat_message={message} prev_message_from_same_chatter={checkedPrevUser.current[index]} key={index}>

                </MessageFull>
              )
            }
          )
        }
      </div>
    </>
  )
}

export default App
