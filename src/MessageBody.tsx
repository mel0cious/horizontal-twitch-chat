import type { CompressedChatMessage } from "./App";
import { emoteParser } from "./auth";
//import DOMPurify from 'dompurify';

interface MessageBodyProps {
    chat_message: CompressedChatMessage
}

// For the function sanitize:
// Source - https://stackoverflow.com/a/48226843
// Posted by SilentImp, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-22, License - CC BY-SA 4.0

function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}


export default function MessageBody({chat_message} : MessageBodyProps) {
    const sanitized = sanitize(chat_message.text)
    const parsed = emoteParser.parse(sanitized);

    console.log(parsed)
    return (
        // Dangerously Set Inner HTML, rarely should be used, but it works. I tried to execute a XSS attack but I couldn't. Maybe it's still possible, but I can't think of a better way.
        // I was able to successfully execute a XSS attack on this. TODO: Update this
        <div dangerouslySetInnerHTML={{__html: parsed}} className="message-body"> 
            
        </div>

    )
}