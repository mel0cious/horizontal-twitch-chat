import type { ChatMessage } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";
import { emoteFetcher, emoteParser } from "./auth";
import { useEffect } from "react";

interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean
}

export default function MessageFull({chat_message, prev_message_from_same_chatter} : MessageProps) {
    const channelId : number = parseInt(chat_message.msg.channelId!)
    let parsed
    useEffect(() => {
        Promise.all([
        // Twitch global
        emoteFetcher.fetchTwitchEmotes(),
        // Twitch channel
        emoteFetcher.fetchTwitchEmotes(channelId),
        // BTTV global
        emoteFetcher.fetchBTTVEmotes(),
        // BTTV channel
        emoteFetcher.fetchBTTVEmotes(channelId),
        // 7TV global
        emoteFetcher.fetchSevenTVEmotes(),
        // 7TV channel
        emoteFetcher.fetchSevenTVEmotes(channelId),
        // FFZ global
        emoteFetcher.fetchFFZEmotes(),
        // FFZ channel
        emoteFetcher.fetchFFZEmotes(channelId),
        ]).then (() => {
            parsed = emoteParser.parse(chat_message.text)
        })
    }, [channelId])


 //   console.log(chat_message.msg.channelId)
    return (
    <div className="message-container">
        {
            (prev_message_from_same_chatter)
            ? <></>
            : <MessageHeader cm={chat_message}/> 
        }
        <div className="message-body">{chat_message.text} </div>
        
    </div>
    )
}