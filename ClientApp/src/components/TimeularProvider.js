import React, { createContext, useState } from "react";

export const TimeularContext = createContext()

export const TimeularProvider = (props) => {
    const [token, setToken] = useState({})
    const [reportData, setReportData] = useState([])

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

    const getDailyReport = () => {
        const todaysDate = new Date().toISOString().slice(0, 10)
        return fetch(`https://api.timeular.com/api/v3/time-entries/${todaysDate}T00:00:00.000/${todaysDate}T23:59:59.999`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
            },
        })
        .then(res => res.json())
        .then(res => setReportData(res))
        // "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
    }
    return (
        <TimeularContext.Provider value={{ getAPIToken, token, getDailyReport, reportData }}>
            {props.children}
        </TimeularContext.Provider>
    )
}