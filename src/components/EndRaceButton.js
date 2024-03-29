import React from 'react';

function EndRaceButton(props) {

    function handleOnClick() {

        fetch(`https://localhost:5001/races/${props.raceId}`, {
            method: 'put',
            body: JSON.stringify({ raceStatusBackEnd: 'complete'})
        })
            .then(function (response) {

                if (response.status !== 204) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                props.raceInProgress();
                })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    return (
        <div><button onClick={handleOnClick}>End Race</button></div>
    )
}

export default EndRaceButton;