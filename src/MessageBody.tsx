import React, { useEffect } from "react";
import type { CompressedChatMessage } from "./App";
import { emoteFetcher, emoteParser } from "./auth";
import { getDefaultFontSize } from "./helper_functions";
//import DOMPurify from 'dompurify';


export default function MessageBody(props : {cm: CompressedChatMessage, sp: URLSearchParams}) {
    const fontSize = getDefaultFontSize(props.sp)
    const parsed = emoteParser.parse(props.cm.text);

    console.log(parsed)
    return (
        // Dangerously Set Inner HTML, rarely should be used, but it works. I tried to execute a XSS attack but I couldn't. Maybe it's still possible, but I can't think of a better way.
        <div dangerouslySetInnerHTML={{__html: parsed}} className="message-body"> 
            
        </div>

    )
}