import React, { useContext, useState } from 'react';
import { Report } from './Report';
import { TimeularContext } from './TimeularProvider';

export const Home = () => {

  const loginCredentials = {
    apiKey: "MTMxNjA5XzE1NWFmOWJkNzMwZjQyZmJhOWFkNGUyM2I1YjZmYTZm",
    apiSecret: "MjNkNWEyMGI3MDQ5NDQ5YWE2NDRlZmIwMDAyYTE2MTU="
  }
  const { getAPIToken, token, getDailyReport, reportData } = useContext(TimeularContext)
  const [logInDisabled, setLogInDisabled] = useState(false)
  
  const HandleLogin = () => {
    setLogInDisabled(true)
    getAPIToken(loginCredentials)
  }

  return (
    <div>
      <h1>Hello, Nick!</h1>
      <p>Welcome to your new single-page application.</p>
      <p>{token?.token}</p>
      <button disabled={logInDisabled} onClick={HandleLogin}>Log In</button>
      <button onClick={getDailyReport}>Get Daily Report</button>
      {reportData && <Report />}
    </div>
  )
}
