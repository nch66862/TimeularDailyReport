import React from 'react';

export const Time = ({ time }) => {

    const timeInMilliseconds = new Date(time).getTime()
    const dateMovedBack = new Date(timeInMilliseconds - 18000000)
    const formattedTime = dateMovedBack.toLocaleTimeString("en-US",{hour: '2-digit', minute: '2-digit', hour12: true})
    return (
        <div>
            <h5>{formattedTime}</h5>
        </div>
    )
}