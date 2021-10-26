import React, { createContext, useState } from "react";

export const TimeularContext = createContext()

export const TimeularProvider = (props) => {
    const [token, setToken] = useState({})

    const getAPIToken = (keyAndSecret) => {
        return fetch("https://api.timeular.com/api/v3/developer/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(keyAndSecret)
        })
        .then(res => res.json())
        .then(res => setToken(res))
        // "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
    }
    return (
        <TimeularContext.Provider value={{ getAPIToken, token }}>
            {props.children}
        </TimeularContext.Provider>
    )
}