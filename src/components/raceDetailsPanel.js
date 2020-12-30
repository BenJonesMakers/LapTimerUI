import React from 'react';

class RaceDetailsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render () {
        console.log('detailslaps', this.props.laps);
        return (
            <div>Laps Data:
                {this.props.laps.map((lap, index) => (
        <p>Lap {index}: {lap} </p>
    ))}{}</div>
        )
    }
}

export default RaceDetailsPanel;