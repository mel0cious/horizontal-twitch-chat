import { buildEmoteImageUrl, parseChatMessage, type ParsedMessagePart } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import { emoteParser } from "./auth";
import { sanitize } from "./helper_functions";


interface MessageBodyProps {
    chat_message: CompressedChatMessage
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
        // Dangerously set Inner HTML. Fixed XSS attacks by parsing chat messages
        <div dangerouslySetInnerHTML={{__html: parsedAllEmotes}} className="message-body"> 
            
        </div>

    )
}