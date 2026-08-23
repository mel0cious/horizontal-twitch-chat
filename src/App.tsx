import { ChatMessage } from "@twurple/chat";
import { getNewChatClient } from "./chat";
import { useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import MessageFull from "./MessageFull";
import './index.css'
import { getAllBadges, getChannel, getDefaultFont, getDefaultFontColor, getDefaultFontSize } from "./helper_functions";
import { emoteFetcher, TWITCH_API } from "./auth";
import { clientId } from "./creds";
import type { HelixChatBadgeSet } from "@twurple/api";
export type CompressedChatMessage = {
  channel: string,
  user: string,
  text: string,
  msg: ChatMessage,
};

function App() {
  const [searchParams] = useSearchParams() 
  const messageRefArray = useRef<CompressedChatMessage[]>([]) // used purely for check_if_prev_same_usr()
  const [messageArray, setMessageArray] = useState<CompressedChatMessage[]>([])
  const checkedPrevUser = useRef<Boolean[]>([])
  const [channel, setChannel] = useState<string>("")
  const channelIDRef = useRef<number>(0)
  const MAIN_CHAT_CLIENT = getNewChatClient(channel)
  const channelRef = useRef<string>("")
  const lastTypedUserIDRef = useRef<string>("") // used to get all the emote sets that somebody can use off twitch
  const allBadges = useRef<HelixChatBadgeSet[]>([])

  // I hate that this is required for some reason, it really feels like it shouldn't be and I was clever but nope for some bullshit reason it is
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

  // Fetch Third Party Emotes, NOT TWITCH EMOTES FROM THIS
  // This useEffect is also going to fetch a badge list.
  // While this library can fetch twitch emotes, it doesn't do so with all emotes, only channel and global emotes. 
  // Hense, I am using this to fetch third party emotes (FFZ, BTTV, and 7TV)
  useEffect(() => {
        // Global Emotes
        emoteFetcher.fetchFFZEmotes()
    //    emoteFetcher.fetchBTTVEmotes()
     //   emoteFetcher.fetchSevenTVEmotes()

        if (channelIDRef.current == 0) {}
        else {
          // Channel Emotes
          emoteFetcher.fetchFFZEmotes(channelIDRef.current)
     //     emoteFetcher.fetchBTTVEmotes(channelIDRef.current)
      //    emoteFetcher.fetchSevenTVEmotes(channelIDRef.current)
        }

        console.log(`Channel ID Ref: ${channelIDRef.current}, String: ${channelIDRef.current.toString()}`)
        getAllBadges(channelIDRef.current.toString()).then((res)=>{
          allBadges.current = res
          console.log("Resolution: ")
          console.log(res)
          console.log("AllBadgesRef")
          console.log(allBadges.current)
        }).catch(()=> {
          
        })

    }, [channelIDRef.current])

  // twitch chat client stuff
  // should this be a ref?
  useEffect(() => {
    if (!channel || channel === "ERROR_NO_CHANNEL_SET") return;
    
    MAIN_CHAT_CLIENT.connect()
    MAIN_CHAT_CLIENT.onMessage((channel: string, user: string, text: string, msg: ChatMessage) => {
      const cm: CompressedChatMessage = { channel, user, text, msg }
      const channelID = parseInt(msg.channelId!)
      if (channelIDRef.current == channelID) {}
      else channelIDRef.current = channelID
      lastTypedUserIDRef.current = cm.msg.userInfo.userId
      console.log(`Chat User ID: ${lastTypedUserIDRef.current}`)

      checkedPrevUser.current.push(check_if_prev_same_usr(user))
      messageRefArray.current.push(cm)
      setMessageArray(oldArray => [...oldArray, cm])
    })
  }, [channel])  

  if (!check_for_channel()) return (
  <>
  Add A Channel In The URL Using the ?Channel=[YOUR_CHANNEL_NAME]
  </>)


  return (
    <>

      <style> {/* This is needed because of the dynamic serachParams, can't put it inside of a .css file */}
        {`
          .twitch-emote {
            fontSize: ${getDefaultFontSize(searchParams)}; 
            margin-right: 5px;
          }
        `}
      </style>

      <div className="all-messages-container" style={{fontFamily: getDefaultFont(searchParams), color: getDefaultFontColor(searchParams), fontSize: getDefaultFontSize(searchParams)}}>
        <b className="message-container">Connected to {channel}. </b>
        {
          messageArray.map(
            (message, index) => {
              return (
                <MessageFull chat_message={message} prev_message_from_same_chatter={checkedPrevUser.current[index]} key={index} search_params={searchParams} badges={allBadges}>

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
