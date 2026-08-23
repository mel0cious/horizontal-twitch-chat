import { buildEmoteImageUrl, parseChatMessage, parseEmoteOffsets, type ParsedMessagePart } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import { emoteParser } from "./auth";
//import DOMPurify from 'dompurify';

interface MessageBodyProps {
    chat_message: CompressedChatMessage
}

// For the function sanitize: modified slightly so my typescript intellisence would stop yelling at me.
// Source - https://stackoverflow.com/a/48226843
// Posted by SilentImp, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-22, License - CC BY-SA 4.0

function sanitize(string:any) : any {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match:any)=>(map[match]));
}

function getAllTwitchEmotes(parsedMessageParts: ParsedMessagePart[]) : string {
    let returnString : string = ""

    parsedMessageParts.forEach(element => {
        console.log(element)
        if (element.type == "emote") {
            const imageURL = buildEmoteImageUrl(element.id)
            console.log(`imageURL: ${imageURL}`)
            returnString += `<img alt="${element.name}" title="${element.name}" class="twitch-emote" src="${imageURL}">`

        }
        else if (element.type == "text") {
            returnString += sanitize(element.text)
        }
    });


    console.log(returnString)
    return returnString
}

export default function MessageBody({chat_message} : MessageBodyProps) {

    console.log(`Emote Offsets: ${chat_message.msg.emoteOffsets.entries}`)
    console.log(`Parsed Chat Message: ${parseChatMessage(chat_message.text, chat_message.msg.emoteOffsets)}`)
    const parsedFirstParty = getAllTwitchEmotes(parseChatMessage(chat_message.text, chat_message.msg.emoteOffsets))

    const parsedAllEmotes = emoteParser.parse(parsedFirstParty);

    return (
        // Dangerously Set Inner HTML, rarely should be used, but it works. I tried to execute a XSS attack but I couldn't. Maybe it's still possible, but I can't think of a better way.
        // I was able to successfully execute a XSS attack on this. TODO: Update this
        <div dangerouslySetInnerHTML={{__html: parsedAllEmotes}} className="message-body"> 
            
        </div>

    )
}