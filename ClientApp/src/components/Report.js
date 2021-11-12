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
        padding: '15px'
    };

    const timeDivStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '25%'
    };

    const heiphenStyle = {
        paddingLeft: '5px',
        paddingRight: '5px'
    };

    const evenSpacing = {
        width: '15%'
    }

    const timeHeader = {
        width: '25%'
    }

    const activityNoteSpacing = {
        width: '28%'
    }

    return (
        <div>
            <h1>{todaysDate}</h1>
            <div style={divStyle}>
                <h3 style={timeHeader}>Time</h3>
                <h3 style={evenSpacing}>Duration</h3>
                <h3 style={activityNoteSpacing}>Activity</h3>
                <h3 style={activityNoteSpacing}>Note</h3>
            </div>
            {reportData?.timeEntries?.map(entry => {
                return (
                    <div key={entry.id} id={entry.id} style={divStyle}>
                        <div style={timeDivStyle}>
                            <h5><Time time={entry.duration.startedAt} /></h5>
                            <h5 style={heiphenStyle}> - </h5>
                            <h5><Time time={entry.duration.stoppedAt} /></h5>
                        </div>
                        <h5 style={evenSpacing}><TotalTime timeStarted={entry.duration.startedAt} timeEnded={entry.duration.stoppedAt} /></h5>
                        <h5 style={activityNoteSpacing}>{activities.activities.find(a => a.id == entry.activityId)?.name}</h5>
                        <h5 style={activityNoteSpacing}>{entry.note.text}</h5>
                    </div>
                )
            })}
        </div>
    )
}
