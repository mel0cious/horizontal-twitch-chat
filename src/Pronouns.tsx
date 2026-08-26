import { useLayoutEffect, useState } from "react"

interface PronounsProps {
    chat_user : string
}

interface PronounsAPI {
    channel_id: string,
    channel_login: string,
    pronoun_id: string,
    alt_pronoun_id: string | null | undefined // if no alt pronouns
}

// Taken from https://api.pronouns.alejo.io/api/pronouns as of 8/22/2026
const pronounsDisplayDict: {[key: string]: string} = {
    "hehim": "He/Him",
    "sheher": "She/Her",
    "theythem": "They/Them",
    "any": "Any/Any",
    "other": "Other/Other",
    "xexem": "Xe/Xem",
    "faefaer": "Fae/Faer",
    "vever": "Ve/Ver",
    "aeaer": "Ae/Aer",
    "ziehir": "Zie/Hir",
    "perper": "Per/Per",
    "eem": "E/Em",
    "itits": "It/Its"
}

function parsePronouns(pronouns : (PronounsAPI | null)) : (string | undefined | null) {
    if (pronouns === null) return null
    else {
        if (!pronouns.alt_pronoun_id) {
            if (pronouns.pronoun_id == "other") return "Other"
            else if (pronouns.pronoun_id == "any") return "Any"
            return pronounsDisplayDict[pronouns.pronoun_id]
        }
        
        const primaryPronouns = pronounsDisplayDict[pronouns.pronoun_id].split("/")
        const secondaryPronouns = pronounsDisplayDict[pronouns.alt_pronoun_id].split("/")
        return `${primaryPronouns[0]}/${secondaryPronouns[0]}`
    }
}

export default function Pronouns({chat_user} : PronounsProps) {
    const [pronouns, setPronouns] = useState<PronounsAPI | null>(null)

    async function fetchPronouns(chat_user : string) : Promise<void>{
        const pronouns = await fetch(`https://api.pronouns.alejo.io/v1/users/${chat_user}`)

        if (pronouns.status == 404) {
                // Pass
            }
        else {
            const pronounsJSON = pronouns.json()
            pronounsJSON.then((response:unknown)=> {
                setPronouns(response as PronounsAPI)

            })
        }
    }
    useLayoutEffect(() => {
        fetchPronouns(chat_user)
    }, [])

    

    return (
        <>
        {(parsePronouns(pronouns))
        ? <div className="pronouns">({parsePronouns(pronouns)})</div>
        : <></>
        }
        </>
    )
}