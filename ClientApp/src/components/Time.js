import React, { useContext, useEffect } from 'react';

export const Time = ({ time }) => {

    const timeInMilliseconds = new Date(time)
    const timeOffset = new Date(21600)
    const formattedTime = (timeInMilliseconds - timeOffset).toLocaleTimeString("en-US",{hour: '2-digit', minute: '2-digit', hour12: true})
    return (
        <div>
            <h5>{formattedTime}</h5>
        </div>
    )
}