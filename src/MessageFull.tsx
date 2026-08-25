import type { CompressedChatMessage } from "./App";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import type { HelixChatBadgeSet } from "@twurple/api";
import { useEffect, useState, type Ref } from "react";


interface MessageProps {
    chat_message: CompressedChatMessage,
    prev_message_from_same_chatter: Boolean,
    search_params: URLSearchParams,
    badges: HelixChatBadgeSet[]
}

export default function MessageFull({chat_message, prev_message_from_same_chatter, search_params, badges} : MessageProps) {

    const hasBadges = chat_message.msg.userInfo.badges.size > 0
    const hasEmotes = chat_message.msg.emoteOffsets.size > 0

    const [isBadgesFullyLoaded, setIsBadgesFullyLoaded] = useState<boolean>(false)
    const [isEmotesFullyLoaded, setIsEmotesFullyLoaded] = useState<boolean>(false)
    console.log(`New Message: ${chat_message.user}: ${chat_message.text}`)

    useEffect(() => {
        if (prev_message_from_same_chatter) setIsBadgesFullyLoaded(true)
    }, [])

    console.log(`IsBadgesFullyLoaded ${isBadgesFullyLoaded}`)
    console.log(`IsEmotesFullyLoaded ${isEmotesFullyLoaded}`)
    return (
    <div className="message-container">
        {
            (isBadgesFullyLoaded && isEmotesFullyLoaded)
            ? <> 
            {(prev_message_from_same_chatter)
                ? <>{/* I liked empty better */}</> 
                : <MessageHeader chat_message={chat_message} search_params={search_params} badges={badges} setIsBadgesFullyLoaded={setIsBadgesFullyLoaded}/>}
                <MessageBody chat_message={chat_message} setIsEmotesFullyLoaded={setIsEmotesFullyLoaded}/> 
            </>
            : <></>
        }
    </div>
    )
}