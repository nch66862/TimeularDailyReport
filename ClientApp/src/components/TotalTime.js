import React, { useContext, useEffect } from 'react';
import { TimeularContext } from './TimeularProvider';

export const TotalTime = ({ timeStarted, timeEnded }) => {

    const timeStart = new Date(timeStarted)
    const timeEnd = new Date(timeEnded)
    const timeDifference = timeEnd - timeStart //provides the time in ms

    return (
        <div>
            <h5>{(timeDifference/1000/60/60).toFixed(2)} hours</h5>
        </div>
    )
}