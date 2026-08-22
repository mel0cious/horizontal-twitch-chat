import type { CompressedChatMessage } from "./App";
import { getDefaultUserColor } from "./helper_functions";
import Pronouns from "./Pronouns";

interface MessageHeaderProps {
    chat_message: CompressedChatMessage,
    search_params: URLSearchParams
}

function getUserColor(color : (string | undefined), search_params: URLSearchParams) {
    if (color == "" || color == undefined) return getDefaultUserColor(search_params)
    else return color
}

export default function MessageHeader({chat_message, search_params} : MessageHeaderProps) {
    const displayName = chat_message.msg.userInfo.displayName  
    const userColor = getUserColor(chat_message.msg.userInfo.color, search_params)

    console.log(chat_message.msg.userInfo.badges)
    console.log(chat_message.msg.userInfo.badgeInfo)
    console.log(`userColor: ${userColor}`)

    return (
        <>
        <div className="message-header-container" style={{color:userColor}}>
            <Pronouns chat_user={chat_message.user} /> <div className="userName">{displayName}</div>:
        </div>
        </>
    )
}