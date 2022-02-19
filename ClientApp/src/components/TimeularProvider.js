import React, { createContext, useState } from "react";

export const TimeularContext = createContext()

export const TimeularProvider = (props) => {
    const [token, setToken] = useState({})
    const [reportData, setReportData] = useState({})
    const [activities, setActivities] = useState({})

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
    }

    const getDailyReport = (requestedDate) => {
        return fetch(`https://api.timeular.com/api/v3/time-entries/${requestedDate}T00:00:00.000/${requestedDate}T23:59:59.999`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
            },
        })
            .then(res => res.json())
            .then(res => setReportData(res))
    }
    const getActivities = () => {
        return fetch(`https://api.timeular.com/api/v3/activities`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.token}`,
            },
        })
            .then(res => res.json())
            .then(res => setActivities(res))
    }
    return (
        <TimeularContext.Provider value={{ getAPIToken, token, getDailyReport, reportData, getActivities, activities }}>
            {props.children}
        </TimeularContext.Provider>
    )
}