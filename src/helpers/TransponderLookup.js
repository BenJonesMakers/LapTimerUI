
const getRealName = (transponderId) => {

  var fakeData = {
    1006319: 'Ben',
    1003456: 'Pip',
    1003666: 'Dan'
  };

  return fakeData[transponderId];
}

export default getRealName;