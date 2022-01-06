import React from 'react';

function StartRaceButton(props) {

    function putStartRace(raceId) {
        fetch(`https://localhost:5001/races/${raceId}`, {
            method: 'put',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
            },
            body: JSON.stringify({ raceStatusBackEnd: 'countdown'}),
        })
            .then(function (response) {
                if (response.status !== 204) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })
    }

    function handleOnClick() {
        fetch('https://localhost:5001/races', {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
            },
            body: JSON.stringify({ raceStatusBackEnd: 'countdown'}),
        })
            .then(function (response) {
                if (response.status !== 201) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                    props.raceInProgress(data.raceId);
                    return data.raceId;
                })
                    .then(function (raceId) {
                    putStartRace(raceId);
                })

            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            })

    }


    return (
        <div><button onClick={handleOnClick}>Start Race</button></div>
    )
}

export default StartRaceButton;