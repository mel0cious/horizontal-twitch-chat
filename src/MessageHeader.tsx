import { useRef, useState } from "react";
import type { CompressedChatMessage } from "./App";
import { toUserName } from "@twurple/chat";





export default function MessageHeader(props : {cm: CompressedChatMessage}) {
    const displayName = props.cm.msg.userInfo.displayName  
    const userColor = props.cm.msg.userInfo.color ?? "#ff9ce0"

    console.log(userColor)

    return (
        <>
        <div className="message-header-container"><div className="userName" style={{color:userColor}}>{displayName}</div>:</div>
        </>
    )
}