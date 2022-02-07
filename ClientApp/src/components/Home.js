import React, { useContext, useState } from 'react';
import { Report } from './Report';
import { TimeularContext } from './TimeularProvider';

export const Home = () => {

  const { getAPIToken, token, getActivities, getDailyReport } = useContext(TimeularContext)
  const [logInDisabled, setLogInDisabled] = useState(false)
  const [dailyReportEnabled, setDailyReportEnabled] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState(
    {
      apiKey: "MTMxNjA5XzE1NWFmOWJkNzMwZjQyZmJhOWFkNGUyM2I1YjZmYTZm",
      apiSecret: "MjNkNWEyMGI3MDQ5NDQ5YWE2NDRlZmIwMDAyYTE2MTU="
    })
  const [chosenDate, setChosenDate] = useState(getCurrentDate())

  const HandleLogin = () => {
    setLogInDisabled(true)
    getAPIToken(loginCredentials)
  }

  const ChangeAPIKey = (newApiKey) => {
    let credentials = { ...loginCredentials }
    credentials.apiKey = newApiKey
    setLoginCredentials(credentials)
  }

  const ChangeAPISecret = (newApiSecret) => {
    let credentials = { ...loginCredentials }
    credentials.apiSecret = newApiSecret
    setLoginCredentials(credentials)
  }

  const ChangeChosenDate = (datetime) => {
    
  }

  const HandleDailyReport = () => {
    getDailyReport()
      .then(() => getActivities())
      .then(() => setDailyReportEnabled(true))
  }

  const getCurrentDate = () => {
    const d = new Date()
    const z = (n) => {
      return (n < 10 ? '0' : '') + n
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
  }

  return (
    <div>
      <h1>Hello, Nick!</h1>
      <p>Welcome to your Daily Report Sender.</p>
      <div>
        <label>API Key</label>
        <input type='text' value={loginCredentials.apiKey} onChange={ChangeAPIKey} />
      </div>
      <div>
        <label>API Secret</label>
        <input type='text' value={loginCredentials.apiSecret} onChange={ChangeAPISecret} />
      </div>
      <input type='date' onChange={ChangeChosenDate} />
      <p>{token?.token}</p>
      <button disabled={logInDisabled} onClick={HandleLogin}>Log In</button>
      <button onClick={HandleDailyReport}>Get Daily Report</button>
      {dailyReportEnabled && <Report />}
    </div>
  )
}
