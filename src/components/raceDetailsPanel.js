import React, { useEffect, useRef, useState } from 'react';
import NewRaceLeader from './NewRaceLeader';
import RaceEntryDetails from './raceEntryDetails'

const RaceDetailsPanel = ({ laps, uniqueTransponders }) => {

    const filteredAndSortedLaps = useRef([]);
    // object in array is:
    // {
    //   transponderId: 'string',
    //   filteredLaps: [],
    //   totalLapTime: float
    // }
    const [raceLeaderChanged, setRaceLeaderChanged] = useState(false);


    useEffect(() => {

        let oldFSL = filteredAndSortedLaps.current || [];
        filteredAndSortedLaps.current = [];

        const filteredLaps = (transponder) => {
            return laps.filter(lap => lap.transponderId === transponder);
        }

        const totalLapTime = (transponder) => {
            var totalLapTimeByTransponder = filteredLaps(transponder).reduce(function (prev, current) {
                return prev + +current.laptime
            }, 0);

            return totalLapTimeByTransponder.toFixed(3);
        }

        if (laps.length) {
            uniqueTransponders.forEach(transponderId => {
                filteredAndSortedLaps.current.push(
                    {
                        transponderId: transponderId,
                        filteredLaps: filteredLaps(transponderId),
                        totalLapTime: totalLapTime(transponderId)
                    }
                );

            });

            filteredAndSortedLaps.current = filteredAndSortedLaps.current.sort((a, b) => a.totalLapTime - b.totalLapTime);

            // check if position has changed
            setRaceLeaderChanged(false);

            if (oldFSL.length) {
                var oldLeader = oldFSL[0].transponderId;
                var newLeader = filteredAndSortedLaps.current[0].transponderId;
                if (oldLeader !== newLeader) {
                    setRaceLeaderChanged(true);
                }
            }
        }

    }, [laps, uniqueTransponders]);

    return (
        <>
            {raceLeaderChanged && <NewRaceLeader />}
            {filteredAndSortedLaps.current.length > 0 ?
                filteredAndSortedLaps.current.map((transponder, index) => (
                    <RaceEntryDetails
                        key={transponder.transponderId}
                        transponderId={transponder.transponderId}
                        filteredLaps={transponder.filteredLaps}
                        totalLapTime={transponder.totalLapTime}
                        position={index}
                    />
                )) : <p>Race not running</p>
            }
        </>
    )

}

export default RaceDetailsPanel;
