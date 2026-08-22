export function getDefaultUserColor(sp : URLSearchParams) : string {
    const hexRegex = /#[0-9A-Fa-f]{6}/ // regular expression to make sure it's in the right format
    const defaultColor = sp.get("DefaultUserColor") 
    if (defaultColor && hexRegex.test(defaultColor)) return defaultColor
    else return "#dd0f0f" // this color works the best for my stream, so that's what we're using. set this properly if that's an issue
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