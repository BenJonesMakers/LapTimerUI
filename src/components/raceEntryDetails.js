import React, { useEffect } from 'react';

const RaceEntryDetails = ({transponderId}) => {

    useEffect(() => {
    console.log('transponderId', transponderId);
    });

  
    return (
        <>
        {transponderId && <div key={transponderId}>
            Transponder No: {transponderId}
        </div>}
        </>
    ) 
}

export default RaceEntryDetails;