import React, { useContext, useEffect } from 'react';

export const Time = ({ time }) => {

    const formattedTime = new Date(time).toLocaleTimeString("en-US",{hour: '2-digit', minute: '2-digit', hour12: true, timeZone: "CST"})
    return (
        <div>
            <h5>{formattedTime}</h5>
        </div>
    )
}