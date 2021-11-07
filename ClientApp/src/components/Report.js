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

    useEffect(() => {
        getActivities()
        // eslint-disable-next-line
    }, [])

    const divStyle = {
        display: 'flex',
        padding: '20px'
    };

    return (
        <div>
            <h1>{todaysDate}</h1>
            {reportData?.timeEntries?.map(entry => {
                return (
                    <div key={entry.id} id={entry.id}>
                        <div>
                            <div>
                                <div style={divStyle}>
                                    <Time time={entry.duration.startedAt} />
                                    <div> - </div>
                                    <Time time={entry.duration.stoppedAt} />
                                    <TotalTime timeStarted={entry.duration.startedAt} timeEnded={entry.duration.stoppedAt} />
                                    <div>{activities.activities.find(a => a.id == entry.activityId)?.name}</div>
                                    <div>{entry.note.text}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
