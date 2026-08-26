import { useState, useRef, useEffect, useLayoutEffect } from "react"
import type { Dispatch, SetStateAction } from "react";
import type { CompressedChatMessage } from "./App"
import { HelixChatBadgeSet } from "@twurple/api"

interface BadgesProps {
    chat_message: CompressedChatMessage,
    badges: HelixChatBadgeSet[],
    setIsBadgesFullyLoaded: Dispatch<SetStateAction<boolean>>
}

export default function Badges({chat_message, badges, setIsBadgesFullyLoaded} : BadgesProps) {

    const [storedBadges, setStoredBadges] = useState<HelixChatBadgeSet[]>([])
    const [currentlyLoadedImages, setCurrentlyLoadedImages] = useState<number>(0)
    const imagesToLoad = useRef<number>(0)

    function getBadgeString(badge : HelixChatBadgeSet) : string {
        const baseVersion = badge.versions[0]
        return baseVersion.getImageUrl(2)
    }

    const userBadges = useRef(chat_message.msg.userInfo.badges)

    console.log("Passed down badges")
    console.log(badges)
    console.log("User Badges")
    console.log(userBadges)

    useLayoutEffect(()=> {
        console.log("In UseEffect")
        let returnArray : HelixChatBadgeSet[] = []
        for (let [userBadgeName] of userBadges.current) {
            console.log("Looking through badges")
             const foundBadge = badges.find((badge) => {
                if (badge.id == userBadgeName) {
                    console.log(`Badge Found: ${badge.id}`)
                    return badge
                }
            })

            if (foundBadge) returnArray.push(foundBadge)

        }

        console.log(`In badges useEffect: ${returnArray}`)
        setStoredBadges(returnArray)

    }, [badges, userBadges])

    useLayoutEffect(() => {
        imagesToLoad.current = storedBadges.length
        console.log(`In displayed messages use effect`)
        console.log(`currentlyLoadedImages: ${currentlyLoadedImages}`)
        console.log(`storedBadges ${storedBadges.length}`)
        console.log(`imagesToLoad.current = ${imagesToLoad.current}`)
        if (badges.length == 0 ) {
            console.log("Badges not loaded yet, skipping")
        }
        else {
            if (currentlyLoadedImages == imagesToLoad.current) {
                console.log("Setting isBadgesFullyLoaded to True")
                setIsBadgesFullyLoaded(true)
            }
            if (storedBadges.length == 0) {
                    console.log("Setting isBadgesFullyLoaded to True")
                    setIsBadgesFullyLoaded(true)
        
    }
}
    }, [storedBadges, currentlyLoadedImages])

    function handleNewImages() {
        setCurrentlyLoadedImages(prev => prev + 1)
        console.log(`currentlyLoadedImages: ${currentlyLoadedImages}`)
    }


    return (
    <div className="badges">
    {
        storedBadges.map(
            (storedBadge, index) => {
                return (
                    <>
                    <img 
                    alt={storedBadge.id} 
                    title={storedBadge.id} 
                    className="twitch-badge" 
                    src={getBadgeString(storedBadge)} 
                    key={index}
                    onLoad={() => {
                            handleNewImages()
                    }}
                    />
                    </>
                )
            }
        )
    }

    </div>
    )
}