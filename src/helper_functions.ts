import type { HelixChatBadgeSet } from "@twurple/api"
import { TWITCH_API } from "./auth"

export function getDefaultUserColor(sp : URLSearchParams) : string {
    const hexRegex = /#[0-9A-Fa-f]{6}/ // regular expression to make sure it's in the right format
    const defaultColor = sp.get("DefaultUserColor") 
    if (defaultColor && hexRegex.test(defaultColor)) return defaultColor
    else return "#dd0f0f" // this color works the best for my stream, so that's what we're using. set this properly if that's an issue
}

export function getUserAccessToken(sp: URLSearchParams) : string {
    return sp.get("access_token") ?? "NONE"
}

export function getDefaultFontColor(sp : URLSearchParams) : string {
    const hexRegex = /[0-9A-Fa-f]{6}/ // regular expression to make sure it's in the right format
    const defaultColor = sp.get("DefaultFontColor") 
    if (defaultColor && hexRegex.test(defaultColor)) return `#${defaultColor}`
    else return "#000000"
}

export function getDefaultFontSize(sp : URLSearchParams) : number {
    const size = parseInt(sp.get("FontSize")!) 
    if (Number.isNaN(size)) return 32
    else return size
}

export function getChannel(sp : URLSearchParams) : string {
    return sp.get("Channel") ?? "ERROR_NO_CHANNEL_SET"
  }

export function getDefaultFont(sp: URLSearchParams) : string {

    return sp.get("Font") ?? "Roobert"
}

export async function getAllBadges(channelID: string) : Promise<HelixChatBadgeSet[]> {
    const globalBadges = await TWITCH_API.chat.getGlobalBadges()
    const channelBadges = await TWITCH_API.chat.getChannelBadges(channelID)

    const returnArray = globalBadges.concat(channelBadges)
    return returnArray

}
// For the function sanitize: modified slightly so my typescript intellisence would stop yelling at me.
// Source - https://stackoverflow.com/a/48226843
// Posted by SilentImp, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-22, License - CC BY-SA 4.0

export function sanitize(string:any) {
  const map : any = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match:any)=>(map[match])); // this line throws an error in my IDE for typescript, but it works. I don't know how to get rid of this error tho.
}


export function getBadgeString(badge : HelixChatBadgeSet) : string {
        const baseVersion = badge.versions[0]
        return baseVersion.getImageUrl(2)
    }