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

export const getFakeRaceDataSingleTransponder = (transponder, lapNumber) => {

  console.log('I\'m sending fake race data.  For Transponder: ', transponder, lapNumber);
  var tempLaps = [];

  let fakeLap = {
    transponderId: transponder,
    lapNo: lapNumber,
    laptime: generateRandomNumber(8.000, 10.000)
  }

  tempLaps.push(fakeLap);

  return tempLaps;
}

export const getFakeAPIRaceData = () => {

  return fetch('http://localhost:3000/liverace/testrace', {
    method: 'get'
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function (data) {

        console.log('inside function: ', data);
        return data;
      })

    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    })

}
