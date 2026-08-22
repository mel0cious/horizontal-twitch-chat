import type { CompressedChatMessage } from "./App";
import { emoteParser } from "./auth";
//import DOMPurify from 'dompurify';

interface MessageBodyProps {
    chat_message: CompressedChatMessage
}

export default function MessageBody({chat_message} : MessageBodyProps) {
    const parsed = emoteParser.parse(chat_message.text);

    console.log(parsed)
    return (
        // Dangerously Set Inner HTML, rarely should be used, but it works. I tried to execute a XSS attack but I couldn't. Maybe it's still possible, but I can't think of a better way.
        // I was able to successfully execute a XSS attack on this. TODO: Update this
        <div dangerouslySetInnerHTML={{__html: parsed}} className="message-body"> 
            
        </div>

    )
}