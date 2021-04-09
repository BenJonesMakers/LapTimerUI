import { generateRandomNumber } from './Utilities';

export const getFakeRaceData = (uniqueTransponders, lapNumber) => {

  console.log('I\'m sending fake race data.  Lap Number: ', lapNumber);
  var tempLaps = [];

  uniqueTransponders.forEach(transponder => {

    let fakeLap = {
      transponderId: transponder,
      lapNo: lapNumber,
      laptime: generateRandomNumber(8.000, 10.000)
    }

    tempLaps.push(fakeLap);
  });

  return tempLaps;
}

// async getRaceData() {
//     let self = this;

//     if (raceStatus === 'running') {
//         console.log('I ran');
//         await fetch('http://localhost:3000/liverace/', {
//             method: 'get'
//         })
//             .then(function (response) {
//                 if (response.status !== 200) {
//                     console.log('Looks like there was a problem. Status Code: ' +
//                         response.status);
//                     return;
//                 }

//                 response.json().then(function (data) {
//                     self.setState({ laps: data.laps });
//                     self.setState({ uniqueTransponders: data.uniqueTransponders });
//                     console.log('lap data:', data.laps);
//                 })

//             })
//             .catch(function (err) {
//                 console.log('Fetch Error :-S', err);
//             })
//     }
// }
