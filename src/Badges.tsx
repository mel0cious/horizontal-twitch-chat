import { useEffect, type Ref } from "react"
import type { CompressedChatMessage } from "./App"
import { TWITCH_API } from "./auth"
import type { HelixChatBadgeSet } from "@twurple/api"

interface BadgesProps {
    chat_message: CompressedChatMessage,
    badges: Ref<HelixChatBadgeSet[]>
}

export default function Badges({chat_message, badges} : BadgesProps) {


    const userBadges = chat_message.msg.userInfo.badges
    const userBadgeInfo = chat_message.msg.userInfo.badgeInfo

    console.log("Passed down badges")
    console.log(badges)
    console.log("User Badges")
    console.log(userBadges)

    useEffect(() => {

    }, [])
    
    return (
    <>
    </>
    )
}