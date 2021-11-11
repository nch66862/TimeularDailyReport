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

    const evenSpacing = {
        width: '15%'
    }

    return (
        <div>
            <h1>{todaysDate}</h1>
            <div style={divStyle}>
                <div style={evenSpacing}>Time</div>
                <div style={evenSpacing}>Duration</div>
                <div style={evenSpacing}>Activity</div>
                <div style={evenSpacing}>Note</div>
            </div>
            {reportData?.timeEntries?.map(entry => {
                return (
                    <div key={entry.id} id={entry.id} style={divStyle}>
                        <div style={evenSpacing}><Time time={entry.duration.startedAt} /></div>
                        <h5 style={evenSpacing}> - </h5>
                        <div style={evenSpacing}><Time time={entry.duration.stoppedAt} /></div>
                        <div style={evenSpacing}><TotalTime timeStarted={entry.duration.startedAt} timeEnded={entry.duration.stoppedAt} /></div>
                        <h5 style={evenSpacing}>{activities.activities.find(a => a.id == entry.activityId)?.name}</h5>
                        <h5 style={evenSpacing}>{entry.note.text}</h5>
                    </div>
                )
            })}
        </div>
    )
}
