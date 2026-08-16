import { useRef, useState } from "react";
import type { CompressedChatMessage } from "./App";
import { toUserName } from "@twurple/chat";
import { useSearchParams } from "react-router";
import { getDefaultUserColor } from "./helper_functions";


export default function MessageHeader(props : {cm: CompressedChatMessage, sp: URLSearchParams}) {
    const displayName = props.cm.msg.userInfo.displayName  
    const userColor = props.cm.msg.userInfo.color ?? getDefaultUserColor(props.sp)

    console.log(props.cm.msg.userInfo.badges)
    console.log(props.cm.msg.userInfo.badgeInfo)

    return (
        <>
        <div className="message-header-container"><div className="userName" style={{color:userColor}}>{displayName}</div>:</div>
        </>
    )
}