import type { Ref } from "react";
import type { CompressedChatMessage } from "./App";
import Badges from "./Badges";
import { getDefaultUserColor } from "./helper_functions";
import Pronouns from "./Pronouns";
import type { HelixChatBadgeSet } from "@twurple/api";

interface MessageHeaderProps {
    chat_message: CompressedChatMessage,
    search_params: URLSearchParams,
    badges: Ref<HelixChatBadgeSet[]>
}

function getUserColor(color : (string | undefined), search_params: URLSearchParams) {
    if (color == "" || color == undefined) return getDefaultUserColor(search_params)
    else return color
}

export default function MessageHeader({chat_message, search_params, badges} : MessageHeaderProps) {
    const displayName = chat_message.msg.userInfo.displayName  
    const userColor = getUserColor(chat_message.msg.userInfo.color, search_params)

    console.log(chat_message.msg.userInfo.badges)
    console.log(chat_message.msg.userInfo.badgeInfo)
    console.log(`userColor: ${userColor}`)

    return (
        <>
        <div className="message-header-container" style={{color:userColor}}>
            <Pronouns chat_user={chat_message.user} /> 
            <Badges chat_message={chat_message} badges={badges} />
            <div className="userName">{displayName}</div>:
        </div>
        </>
    )
}