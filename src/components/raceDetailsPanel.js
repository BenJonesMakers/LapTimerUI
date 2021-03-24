import React from 'react';
import RaceEntryDetails from './raceEntryDetails'

const RaceDetailsPanel = ({ laps, uniqueTransponders }) => {

    return (
        <>
            {uniqueTransponders.length > 0 ?
                uniqueTransponders.map((transponder, index) => (
                    <RaceEntryDetails key={transponder} transponderId={transponder} laps={laps} />
                )) : <p>empty</p>
            }
        </>
    )

}

export default RaceDetailsPanel;
