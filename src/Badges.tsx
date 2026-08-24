import { useEffect, useState, type Ref } from "react"
import type { CompressedChatMessage } from "./App"
import { TWITCH_API } from "./auth"
import { HelixChatBadgeSet } from "@twurple/api"

interface BadgesProps {
    chat_message: CompressedChatMessage,
    badges: HelixChatBadgeSet[]
}

export default function Badges({chat_message, badges} : BadgesProps) {

    const [storedBadges, setStoredBadges] = useState<HelixChatBadgeSet[]>([])
    function getBadgeString(badge : HelixChatBadgeSet) : string {
        const baseVersion = badge.versions[0]
        return baseVersion.getImageUrl(2)
    }

    const userBadges = chat_message.msg.userInfo.badges
    const userBadgeInfo = chat_message.msg.userInfo.badgeInfo

    console.log("Passed down badges")
    console.log(badges)
    console.log("User Badges")
    console.log(userBadges)
    useEffect(() => {
        badges.forEach(badge => {
                if (userBadges.has(badge.id)) { // If the badge is the matching one, render it
                    console.log(`Badge Found: ${badge.id}`)
                    setStoredBadges(oldArray => [...oldArray, badge])
                }           
            })
    }, [badges])
    return (
    <>
    {
        storedBadges.map(
            (storedBadge, index) => {
                return (
                    <img alt={storedBadge.id} title={storedBadge.id} className="twitch-badge" src={getBadgeString(storedBadge)} key={index}/>
                )
            }
        )
    }

    </>
    )
}