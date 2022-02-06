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

  const HandleLogin = () => {
    setLogInDisabled(true)
    getAPIToken(loginCredentials)
  }

  const ChangeAPIKey = () => {
    const 
  }

  const HandleDailyReport = () => {
    getDailyReport()
      .then(() => getActivities())
      .then(() => setDailyReportEnabled(true))
  }

  return (
    <div>
      <h1>Hello, Nick!</h1>
      <p>Welcome to your Daily Report Sender.</p>
      <input type='text' defaultValue={loginCredentials.apiKey} onChange={ChangeAPIKey} />
      <p>{token?.token}</p>
      <button disabled={logInDisabled} onClick={HandleLogin}>Log In</button>
      <button onClick={HandleDailyReport}>Get Daily Report</button>
      {dailyReportEnabled && <Report />}
    </div>
  )
}
