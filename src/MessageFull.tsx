import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import type { HelixChatBadgeSet } from "@twurple/api";
import type { Ref } from "react";


interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean,
    search_params: URLSearchParams,
    badges: Ref<HelixChatBadgeSet[]>
}

export default function MessageFull({chat_message, prev_message_from_same_chatter, search_params, badges} : MessageProps) {

    return (
    <div className="message-container">
        {
            (prev_message_from_same_chatter)
            ? <>{/* I liked empty better */}</> 
            : <MessageHeader chat_message={chat_message} search_params={search_params} badges={badges}/> 
        }
        <MessageBody chat_message={chat_message}/>
        
    </div>
    )
}