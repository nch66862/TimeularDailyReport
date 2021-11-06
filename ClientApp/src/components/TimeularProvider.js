import React, { createContext, useState } from "react";

export const TimeularContext = createContext()

export const TimeularProvider = (props) => {
    const [token, setToken] = useState({})
    const [reportData, setReportData] = useState({})
    const [activities, setActivities] = useState({})

    const getCurrentDate = () => {
        const d = new Date()
        const z = (n) => {
            return (n < 10 ? '0' : '') + n
        }
        return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
    }

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

    const getDailyReport = () => {
        //const todaysDate = getCurrentDate()
        const todaysDate = "2021-11-05"
        return fetch(`https://api.timeular.com/api/v3/time-entries/${todaysDate}T00:00:00.000/${todaysDate}T23:59:59.999`, {
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

function toISOStringLocal(d) {


}