import React, { useContext } from 'react';
import { TimeularContext } from './TimeularProvider';

export const Report = () => {

    const { reportData } = useContext(TimeularContext)
    const todaysDate = new Date().toLocaleDateString("en-US",
    {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: "UTC"
    })

    return (
        <div>
            <h1>Summary of {todaysDate}</h1>
            <p>Welcome to your new single-page application.</p>
            {reportData?.timeEntries?.map(entry => {
                    return (
                        <div key={entry.id} id={entry.id}>
                            <div>
                                <div>
                                    <div>
                                        <div id={entry.id}>{entry.activityId}</div>
                                        <div id={entry.id}>{entry.duration.startedAt}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
