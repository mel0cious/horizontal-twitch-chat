import type { ChatMessage } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";

interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean
}

export default function Message({chat_message, prev_message_from_same_chatter} : MessageProps) {


    return (
    <div className="message">
        {
            (prev_message_from_same_chatter)
            ? <></>
            : <MessageHeader cm={chat_message}/> 
        }
        
    </div>
    )
}