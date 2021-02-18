import React from 'react';
import RaceDetailsPanel from './raceDetailsPanel';
import StartRaceButton from './startRaceButton';
import StopListeningButton from './stopListeningButton';



class RaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uniqueTransponders: [],
            laps: [],
            raceInProgress: false
        }

        this.getRaceData = this.getRaceData.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.setRaceInProgress = this.setRaceInProgress.bind(this);
    }

    setRaceInProgress () {
        this.setState({raceInProgress: true});
        console.log('race state changed');
        console.log('value', this.state.raceInProgress);
    }

    handleOnClick(e) {
        e.preventDefault();
        console.log('clicked');
        if (this.state.raceInProgress) {
            this.setState({raceInProgress: false});
        } else {
            this.setState({raceInProgress: true});
        }
    }

    async getRaceData () {
        let self = this;
        
        if (this.state.raceInProgress) {
            console.log('I ran');
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
                        self.setState({uniqueTransponders: data.uniqueTransponders});
                        console.log('lap data:', data.laps);
                })
                
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            })
        }
    }

    componentDidMount() {
        
        const setIntervalAsync = (fn, ms) => {
            fn().then(() => {
              setTimeout(() => setIntervalAsync(fn, ms), ms);
            });
          };

        try {
            setIntervalAsync(this.getRaceData, 5000);
        } catch(e) {
            console.log(e);
        }


    }

    render () {
        return (
            <div>
                <RaceDetailsPanel laps={this.state.laps} uniqueTransponders={this.state.uniqueTransponders}/>
                <StartRaceButton raceInProgress={this.setRaceInProgress}/>
                <StopListeningButton />
                <button onClick={this.handleOnClick}>toggle fake running</button>
            </div>
        );
    };
}

export default RaceScreen;