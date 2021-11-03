import React, { useContext } from 'react';
import { TimeularContext } from './TimeularProvider';

export const Report = () => {

    const { reportData } = useContext(TimeularContext)

    return (
        <div>
            <h1>Hello, Nick!</h1>
            <p>Welcome to your new single-page application.</p>
        </div>
    )
}
