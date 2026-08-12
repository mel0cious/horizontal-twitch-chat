import type { ChatMessage } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";

interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean
}

export default function Message({chat_message} : MessageProps) {


    return (
    <div className="message">
        
    </div>
    )
}