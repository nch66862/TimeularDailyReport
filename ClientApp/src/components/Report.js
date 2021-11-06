import React, { useContext, useEffect } from 'react';
import { TimeularContext } from './TimeularProvider';

export const Report = () => {

    const { reportData, getActivities, activities } = useContext(TimeularContext)
    const todaysDate = new Date().toLocaleDateString("en-US",
    {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: "CST"
    })

    useEffect(() => {
        getActivities()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>{todaysDate}</h1>
            {reportData?.timeEntries?.map(entry => {
                    return (
                        <div key={entry.id} id={entry.id}>
                            <div>
                                <div>
                                    <div>
                                        <div id={entry.id}>{activities.activities.find(a => a.id == entry.activityId)?.name}</div>
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
