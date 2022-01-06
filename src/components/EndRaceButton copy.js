import React from 'react';

function EndRaceButton(props) {

    function handleOnClick() {
        fetch('http://localhost:3001/liveRace/endrace/', {
            method: 'post'
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    props.raceInProgress();
                })

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