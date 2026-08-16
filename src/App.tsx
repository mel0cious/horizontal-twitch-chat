import { ChatClient, ChatMessage } from "@twurple/chat";
import { getNewChatClient } from "./chat";
import { BrowserRouter, useLocation, useParams, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import MessageFull from "./MessageFull";
import './index.css'
import { getChannel, getDefaultFont, getDefaultFontColor, getDefaultFontSize } from "./helper_functions";
import { emoteFetcher } from "./auth";
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
  const MAIN_CHAT_CLIENT = getNewChatClient(channel)
  const channelIDRef = useRef<number>(0)

  useEffect(() => {
    const myChannel = getChannel(searchParams)
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

        if (channelIDRef.current == 0) {}
        else {
          // Global Emotes
          emoteFetcher.fetchTwitchEmotes()
          emoteFetcher.fetchFFZEmotes()
          emoteFetcher.fetchBTTVEmotes()
          emoteFetcher.fetchSevenTVEmotes()
          // Chhannel Emotes
          emoteFetcher.fetchTwitchEmotes(channelIDRef.current)
          emoteFetcher.fetchFFZEmotes(channelIDRef.current)
          emoteFetcher.fetchBTTVEmotes(channelIDRef.current)
          emoteFetcher.fetchSevenTVEmotes(channelIDRef.current)
        }
    }, [channelIDRef.current])

  useEffect(() => {
    if (!channel || channel === "ERROR_NO_CHANNEL_SET") return;
    
    MAIN_CHAT_CLIENT.connect()
    MAIN_CHAT_CLIENT.onMessage((channel: string, user: string, text: string, msg: ChatMessage) => {
      const cm: CompressedChatMessage = { channel, user, text, msg }
      const channelID = parseInt(msg.channelId!)
      if (channelIDRef.current == channelID) {}
      else channelIDRef.current = channelID

      checkedPrevUser.current.push(check_if_prev_same_usr(user))
      messageRefArray.current.push(cm)
      setMessageArray(oldArray => [...oldArray, cm])
    })
  }, [channel])  

  if (!check_for_channel()) return <>Add A Channel In The URL Using the ?Channel=[YOUR_CHANNEL_NAME]</>


  return (
    <>

      <style>
        {`
          .twitch-emote {
            fontSize: ${getDefaultFontSize(searchParams)}
          }
        `}
      </style>

      <div className="all-messages-container" style={{fontFamily: getDefaultFont(searchParams), color: getDefaultFontColor(searchParams), fontSize: getDefaultFontSize(searchParams)}}>
        <b className="message-container">Connected to {channel}. </b>
        {
          messageArray.map(
            (message, index) => {
              return (
                <MessageFull chat_message={message} prev_message_from_same_chatter={checkedPrevUser.current[index]} key={index} search_params={searchParams}>

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
