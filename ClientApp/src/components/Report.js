import React, { useContext, useEffect, useState } from 'react';
import { Time } from './Time';
import { TimeularContext } from './TimeularProvider';
import { TotalTime } from './TotalTime';

export const Report = ({ chosenDate }) => {

    const { reportData, activities } = useContext(TimeularContext)
    const formattedDate = new Date(chosenDate).getTime() + 86400000
    const dateDisplay = new Date(formattedDate).toLocaleDateString("en-US",
        {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    const [sortedEntries, setSortedEntries] = useState([])

    useEffect(() => {
        setSortedEntries(sortEntries(reportData))
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

    const sendEmail = () => {
        var email = "nicholascarver2@outlook.com"
        var subject = `Daily Report ${dateDisplay}`
        var emailBody = document.getElementById('report').innerHTML
        document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody
    }

    return (
        <div>
            <button onClick={sendEmail}>Send Email</button>
            <h1>{dateDisplay}</h1>
            <div id='report'>
                <div style={divStyle}>
                    <h3 style={timeHeader}>Time</h3>
                    <h3 style={evenSpacing}>Duration</h3>
                    <h3 style={activityNoteSpacing}>Activity</h3>
                    <h3 style={activityNoteSpacing}>Note</h3>
                </div>
                {sortedEntries.map(entry => {
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
        </div>
    )
}

const sortEntries = (entries) => {
    const sortedEntries = entries.timeEntries.slice().sort((a, b) => {
        const aDate = new Date(a.duration.startedAt)
        const bDate = new Date(b.duration.startedAt)
        a.duration.startedAt = aDate
        b.duration.startedAt = bDate
        return a.duration.startedAt - b.duration.startedAt
    })
    return sortedEntries
}