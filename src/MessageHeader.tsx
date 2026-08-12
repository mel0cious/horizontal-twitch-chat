import { useRef, useState } from "react";
import type { CompressedChatMessage } from "./App";
import { TWITCH_API } from "./auth";

function getBadges(user:string) {
    
}

export default function MessageHeader(props : {cm: CompressedChatMessage}) {

    const userID = await TWITCH_API.users.getUserByName(props.cm.user)
    const userColor = await TWITCH_API.chat.getColorForUser(userID?.id)
    
    return (
        <>
        <div className="userName" style={{color: }}}>

        </div>
        </>
    )
}