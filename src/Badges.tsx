import { useEffect, type Ref } from "react"
import type { CompressedChatMessage } from "./App"
import { TWITCH_API } from "./auth"
import type { HelixChatBadgeSet } from "@twurple/api"

interface BadgesProps {
    chat_message: CompressedChatMessage,
    badges: Ref<HelixChatBadgeSet[]>
}

export default function Badges({chat_message, badges} : BadgesProps) {
    const badgesNotPassedDown = chat_message.msg.userInfo.badges
    const badgeInfo = chat_message.msg.userInfo.badgeInfo

    useEffect(() => {

    }, [])
    
    return (
    <>
    </>
    )
}