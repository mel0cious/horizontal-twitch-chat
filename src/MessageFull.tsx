import type { ChatMessage } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";
import { emoteFetcher, emoteParser } from "./auth";
import { useEffect } from "react";

interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean,
    search_params: URLSearchParams
}

export default function MessageFull({chat_message, prev_message_from_same_chatter, search_params} : MessageProps) {

    return (
    <div className="message-container">
        {
            (prev_message_from_same_chatter)
            ? <></>
            : <MessageHeader cm={chat_message} sp={search_params}/> 
        }
        <div className="message-body">{chat_message.text} </div>
        
    </div>
    )
}