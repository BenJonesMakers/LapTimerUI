import React from 'react';

class RaceDetailsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // splitArray() {
    //     this.props.laps.forEach(element => {
    //         element.transponder
    //     });
    // }

    render () {
        console.log('detailslaps', this.props.laps);
        return (
            <div>Transponder Numbers:
                {this.props.uniqueTransponders.map((transponder, index) => (
        <p> {transponder} </p>
    ))}{}</div>
        )
    }
}

export default RaceDetailsPanel;