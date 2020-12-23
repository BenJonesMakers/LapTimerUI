import React from 'react';

export default class AvailablePorts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comPorts: []
        };

        this.getRequestData = this.getRequestData.bind(this);
        //this.fetch = this.fetch.bind(this);
    }

    getRequestData() {
        let self = this;

        fetch('http://localhost:3000/races/listports', {
            method: 'get'
        } )
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
            
            response.json().then(function(data) {
                console.log(data);
                self.setState({comPorts: data.comPorts[0]});
                
            })
            
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }

    componentDidMount() {
        this.getRequestData();
        console.log(this.state);
    }

    
    render () {
        return (
            <div><p>Com Ports: </p>{this.state.comPorts || <p>No com ports found</p>} <button onClick={this.getRequestData}>Refresh</button></div>
        );
    }
}
