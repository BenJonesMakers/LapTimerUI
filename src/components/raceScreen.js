import React from 'react';
import RaceDetailsPanel from './raceDetailsPanel';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';

class RaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laps: [],
            raceInProgress: false
        }
    }

    setRaceInProgress = () => {
        this.setState({raceInProgress: true});
        console.log('race state changed');
        console.log('value', this.state.raceInProgress);
    }

    componentDidMount() {
        const getRaceData = async () => {
            let self = this;
            if (this.state.raceInProgress) {
                await fetch('http://localhost:3000/liverace/', {
                    method: 'get'
                })
                .then(function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                        return;
                    }
                    
                    response.json().then(function(data) {
                            self.setState({laps: data.laps});
                    })
                    
                })
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                })
            }
        }

        const setIntervalAsync = (fn, ms) => {
            fn().then(() => {
              setTimeout(() => setIntervalAsync(fn, ms), ms);
            });
          };

        try {
            setIntervalAsync(getRaceData, 5000);
        } catch(e) {
            console.log(e);
        }
        

    }

    render () {
        return (
            <div>
                <RaceDetailsPanel laps={this.state.laps}/>
                <StartRaceButton raceInProgress={this.setRaceInProgress}/>
                <StopListeningButton />
            </div>
        );
    };
}

export default RaceScreen;