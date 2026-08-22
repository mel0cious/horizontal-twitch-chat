import { useEffect, useState } from "react"

interface PronounsProps {
    chat_user : string
}

function getDisplayPronouns(response) {
    
}

export default function Pronouns({chat_user} : PronounsProps) {
    const [pronouns, setPronouns] = useState<string>("")

    useEffect(() => {
        async function fetchPronouns() {
        const pronouns = await fetch(`https://api.pronouns.alejo.io/v1/users/${chat_user}`)

        if (pronouns.status == 404) {
            // Pass
        }
        else {
            const pronounsJSON = pronouns.json()
            pronounsJSON.then((response)=> {
                console.log(response)
            })
        }
    }

    fetchPronouns()
    }, [])

    

    return (
        <>
        </>
    )
}