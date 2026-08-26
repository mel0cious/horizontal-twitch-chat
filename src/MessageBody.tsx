import { buildEmoteImageUrl, parseChatMessage, type ParsedMessagePart } from "@twurple/chat";
import type { CompressedChatMessage } from "./App";
import { emoteParser } from "./auth";
import { sanitize } from "./helper_functions";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";


interface MessageBodyProps {
    chat_message: CompressedChatMessage,
    setIsEmotesFullyLoaded: Dispatch<SetStateAction<boolean>>
}


export default function MessageBody({chat_message, setIsEmotesFullyLoaded} : MessageBodyProps) {

    const emotesToRender = useRef<number>(0)
    const [emotesRendered, setEmotesRendered] = useState(0)

    function getAllTwitchEmotes(parsedMessageParts: ParsedMessagePart[]) : string {
        let returnString : string = ""

        parsedMessageParts.forEach(element => {
            if (element.type == "emote") {
                emotesToRender.current++
                const imageURL = buildEmoteImageUrl(element.id)
                returnString += `<img 
                alt="${element.name}" 
                title="${element.name}" 
                class="twitch-emote" 
                src="${imageURL}"
                onload="() => setEmotesRendered(prev => prev + 1)"
                >`

            }
            else if (element.type == "text") {
                returnString += sanitize(element.text)
            }
        });


        return returnString
    }

    const parsedFirstParty = getAllTwitchEmotes(parseChatMessage(chat_message.text, chat_message.msg.emoteOffsets))
    const parsedAllEmotes = emoteParser.parse(parsedFirstParty);

    useEffect(() => {
        if (emotesToRender.current == emotesRendered) setIsEmotesFullyLoaded(true)
    }, [emotesRendered])

    return (
        // Dangerously set Inner HTML. Fixed XSS attacks by parsing chat messages
        <div dangerouslySetInnerHTML={{__html: parsedAllEmotes}} className="message-body"> 
            
        </div>

    )
}