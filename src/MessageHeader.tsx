import { useRef, useState } from "react";
import type { CompressedChatMessage } from "./App";


export default function MessageHeader(props : {cm: CompressedChatMessage}) {
    

    return (
        <>
        <div className="userName" >
            {props.cm.user}
        </div>
        </>
    )
}