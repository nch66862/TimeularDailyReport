import React, { useContext, useEffect } from 'react';
import { TimeularContext } from './TimeularProvider';

export const Home = () => {

  const loginCredentials = {
    apiKey: "MTMxNjA5XzE1NWFmOWJkNzMwZjQyZmJhOWFkNGUyM2I1YjZmYTZm",
    apiSecret: "MjNkNWEyMGI3MDQ5NDQ5YWE2NDRlZmIwMDAyYTE2MTU="
  }

  const { getAPIToken, token } = useContext(TimeularContext)

  useEffect(() => {
    getAPIToken(loginCredentials)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>Hello, Nick!</h1>
      <p>Welcome to your new single-page application.</p>
      <p>{token?.token}</p>
    </div>
  )
}
