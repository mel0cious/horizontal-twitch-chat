import { useState, useMemo, useRef, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react";
import type { CompressedChatMessage } from "./App"
import { HelixChatBadgeSet } from "@twurple/api"

interface BadgesProps {
    chat_message: CompressedChatMessage,
    badges: HelixChatBadgeSet[],
    setIsBadgesFullyLoaded: Dispatch<SetStateAction<boolean>>
}

export default function Badges({chat_message, badges, setIsBadgesFullyLoaded} : BadgesProps) {

    const imagesLoadedRef = useRef<boolean>(false)
    const [storedBadges, setStoredBadges] = useState<HelixChatBadgeSet[]>([])
    const [currentlyLoadedImages, setCurrentlyLoadedImages] = useState<number>(0)
    const imagesToLoad = useRef<number>(0)

    function getBadgeString(badge : HelixChatBadgeSet) : string {
        const baseVersion = badge.versions[0]
        return baseVersion.getImageUrl(2)
    }

    const userBadges = chat_message.msg.userInfo.badges

    console.log("Passed down badges")
    console.log(badges)
    console.log("User Badges")
    console.log(userBadges)

    const displayedBadges = useMemo(()=> {
        console.log(`In`)
        let returnArray : HelixChatBadgeSet[] = []
        for (let [userBadgeName] of userBadges) {
            badges.forEach((badge) => { // there's definitely an O(N) solution for this, but this O(N^2) solution seems easier to me
                if (badge.id == userBadgeName) {
                    console.log(`Badge Found: ${badge.id}`)
                    returnArray.push(badge)
                }
            })
        }

        return returnArray
    }, [badges, userBadges])

    useEffect(() => {
        console.log(`In displayed messages use effect`)
        imagesToLoad.current = displayedBadges.length
        setStoredBadges(displayedBadges)
        if (currentlyLoadedImages == imagesToLoad.current) setIsBadgesFullyLoaded(true)
        else if (displayedBadges.length == 0) setIsBadgesFullyLoaded(true)

    }, [displayedBadges])

    useEffect(() => {
        if (currentlyLoadedImages == imagesToLoad.current && !imagesLoadedRef.current && imagesToLoad.current > 0) {
            imagesLoadedRef.current = true
            setIsBadgesFullyLoaded(true)
        }
    }, [currentlyLoadedImages])

    return (
    <>
    {
        storedBadges.map(
            (storedBadge, index) => {
                return (
                    <img 
                    alt={storedBadge.id} 
                    title={storedBadge.id} 
                    className="twitch-badge" 
                    src={getBadgeString(storedBadge)} 
                    key={index}
                    onLoad={() => {
                        setCurrentlyLoadedImages(prev => prev + 1)
                    }}
                    />
                )
            }
        )
    }

    </>
    )
}