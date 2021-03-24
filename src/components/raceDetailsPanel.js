import React from 'react';
import RaceEntryDetails from './raceEntryDetails'

const RaceDetailsPanel = ({ laps, uniqueTransponders }) => {

    //added logic here to pass filtered lap data down as props rather than the entire laps array
    const filteredLaps = (transponder) => {
        if (laps.length) {
            var thisTranspondersLaps = laps.filter(lap => lap.transponderId === transponder);
        }
        return thisTranspondersLaps;
    }

    const totalLapTime = (transponder) => {
        if (laps.length) {
            var thisTranspondersLaps = laps.filter(lap => lap.transponderId === transponder);
            var totalLapTimeByTransponder = thisTranspondersLaps.reduce(function (prev, current) {
                return prev + +current.laptime
            }, 0);
        }
        return totalLapTimeByTransponder.toFixed(3);

    }

    return (
        <>
            {uniqueTransponders.length > 0 ?
                uniqueTransponders.map((transponder) => (
                    <RaceEntryDetails
                        key={transponder}
                        transponderId={transponder}
                        filteredLaps={filteredLaps(transponder)}
                        totalLapTime={totalLapTime(transponder)}
                    />
                )) : <p>empty</p>
            }
        </>
    )

}

export default RaceDetailsPanel;
