import type { ChatMessage } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";

interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean
}

export default function MessageFull({chat_message, prev_message_from_same_chatter} : MessageProps) {


    return (
    <div className="message-container">
        {
            (prev_message_from_same_chatter)
            ? <></>
            : <MessageHeader cm={chat_message}/> 
        }
        <div className="message-body">{chat_message.text}</div>
        
    </div>
    )
}