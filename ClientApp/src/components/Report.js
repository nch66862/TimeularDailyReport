import React, { useContext, useEffect } from 'react';
import { Time } from './Time';
import { TimeularContext } from './TimeularProvider';
import { TotalTime } from './TotalTime';

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

    //time started
    //time ended
    //total time
    //activity
    //note

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
                                        <div id={entry.id}>{<Time time={entry.duration.startedAt}/>} - {<Time time={entry.duration.stoppedAt}/>}</div>
                                        {<TotalTime timeStarted={entry.duration.startedAt} timeEnded={entry.duration.stoppedAt}/>}
                                        <div id={entry.id}>{activities.activities.find(a => a.id == entry.activityId)?.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
