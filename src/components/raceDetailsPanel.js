import React, { useEffect } from 'react';
import RaceEntryDetails from './raceEntryDetails'

const RaceDetailsPanel = ({laps, uniqueTransponders}) => {

    useEffect(() => {
        console.log('laps in race dets panel', laps);
        console.log('num of transponders', uniqueTransponders);
    }, [uniqueTransponders, laps]);

    // splitArray() {
    //     let resultsArray = [];
    //     this.props.uniqueTransponders.forEach(uniqueTransponder => {
    //        //things here are per transponder
    //         const perRacerDetails = {
    //            totalLapTime: null
    //        }
            
    //         this.props.laps.forEach(lap => {
    //             if (lap.transponderId === uniqueTransponder) {
    //                 perRacerDetails.totalTime = perRacerDetails.totalTime + lap.laptime
    //             }
    //         });

    //          resultsArray.push(perRacerDetails);
    //     });
    //     return resultsArray;
    // }

        
        return ( 
            <>
                 {uniqueTransponders.length > 0 ? 
                 uniqueTransponders.map((transponder, index) => (
                   <RaceEntryDetails transponderId={transponder} />
                )) : <p>empty</p>
                }
            </>
        )

}

export default RaceDetailsPanel;