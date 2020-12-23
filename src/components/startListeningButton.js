import React from 'react';

function StartListeningButton(props) {

    function handleOnClick () {
        fetch('http://localhost:3000/races/startlistening/' + props.comPort, {
            method: 'put'
        } )
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
            
            response.json().then(function(data) {
                console.log(data);
            })
            
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    

    return (
        <div><button onClick={handleOnClick}>Start Listening</button></div>
    )
}

export default StartListeningButton;