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
        const startTime = getDateWithTimeZoneOffset(requestedDate)
        const endTime = getDate24HrsLater(requestedDate)
        return fetch(`https://api.timeular.com/api/v3/time-entries/${startTime}/${endTime}`, {
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

const getDateWithTimeZoneOffset = (requestedDate) => {
    const dateWithTimeZone = new Date(new Date(requestedDate).getTime() + changeHoursToMilliseconds(6)).toISOString().split("Z")[0]
    return dateWithTimeZone
}

const getDate24HrsLater = (requestedDate) => {
    const dateWithTimeZone = new Date(new Date(requestedDate).getTime() + changeHoursToMilliseconds(6) + changeHoursToMilliseconds(24)).toISOString().split("Z")[0]
    return dateWithTimeZone
}

const changeHoursToMilliseconds = (numberOfHours) => {
    return numberOfHours * 60 * 60 * 1000
}