import type { CompressedChatMessage } from "./App";
import { getDefaultUserColor } from "./helper_functions";
import Pronouns from "./Pronouns";

interface MessageHeaderProps {
    chat_message: CompressedChatMessage,
    search_params: URLSearchParams
}

export default function MessageHeader({chat_message, search_params} : MessageHeaderProps) {
    const displayName = chat_message.msg.userInfo.displayName  
    const userColor = chat_message.msg.userInfo.color ?? getDefaultUserColor(search_params)

    console.log(chat_message.msg.userInfo.badges)
    console.log(chat_message.msg.userInfo.badgeInfo)

    return (
        <>
        <div className="message-header-container">
            <Pronouns chat_user={chat_message.user} /> <div className="userName" style={{color:userColor}}>{displayName}</div>:
        </div>
        </>
    )
}