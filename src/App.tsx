import { ChatClient, ChatMessage } from "@twurple/chat";
import { getNewChatClient } from "./chat";
import { BrowserRouter, useLocation, useParams, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";

export type CompressedChatMessage = {
  channel: string,
  user: string,
  text: string,
  msg: ChatMessage
};

function App() {
  const [searchParams, getSearchParams] = useSearchParams()
  const messageRefArray = useRef<CompressedChatMessage[]>([])
  const channelRef = useRef<string>("")
  const [channel, setChannel] = useState<string>("")
  function getChannel() : string {
    return searchParams.get("channel") ?? "ERROR_NO_CHANNEL_SET"
  }

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

  // Checks for channel, if no channel tell user what to do  
  useEffect(() => {
    // Don't run if channel is empty or invalid
    if (!channel || channel === "ERROR_NO_CHANNEL_SET") return;
    
    const MAIN_CHAT_CLIENT = getNewChatClient(channel)
    MAIN_CHAT_CLIENT.connect()
    MAIN_CHAT_CLIENT.onMessage((ch: string, user: string, text: string, msg: ChatMessage) => {
      const cm: CompressedChatMessage = { channel: ch, user, text, msg }
      console.log(cm)
      console.log(check_if_prev_same_usr(user))
      messageRefArray.current.push(cm)
      console.log(messageRefArray.current)
    })
    
  }, [channel])  // Make sure channel is in dependencies

  if (!check_for_channel()) return <>Add A Channel In The URL Using the ?channel=[YOUR_CHANNEL_NAME]</>


  return (
    <>
      <h1>Connected to {channel}</h1>
    </>
  )
}

export default App
