import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";


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
            ? <>{/* I liked empty better */}</> 
            : <MessageHeader chat_message={chat_message} search_params={search_params}/> 
        }
        <MessageBody chat_message={chat_message}/>
        
    </div>
    )
}