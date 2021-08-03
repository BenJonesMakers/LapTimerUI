import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ListArchiveRaces = (props) => {
  const [archiveRaces, setArchiveRaces] = useState(props.archiveRaces.reverse());
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalRaceId, setModalRaceId] = useState('');
  const [modalRaceInfo, setModalRaceInfo] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (raceId, formattedDate) => {
    setModalTitle(formattedDate);
    setModalRaceId(raceId);
    setModalRaceInfo(getRaceInfo(raceId, archiveRaces));
    setShow(true);
  }

  const getRaceInfo = (raceId, archiveRaces) => {
    const foundRace = archiveRaces.find((race) => race.race_id === raceId);
    const racers = foundRace.racers;
    const racersOjb = JSON.parse(racers);
    var tempArray = [];
    racersOjb.forEach((racer, index) => {
      var dataString = 'P' + (index + 1) + ' - ' + racer.racerName + ' - ' + racer.totalLaps + ' - ' + racer.totalTime
      tempArray.push(dataString);
    });
    return tempArray;
  }

  useEffect(() => {
    setArchiveRaces(props.archiveRaces.reverse());
  }, [props.archiveRaces]);

  const archiveRacesList = archiveRaces.map((race) => {
    var dateStr = JSON.parse(race.race_start_time);
    var date = new Date(dateStr);
    var formattedDate = date.toString().slice(4, 21);
    return <div key={race.race_id}><li key={race.race_id}>
      <Button
        variant="primary"
        onClick={() => handleShow(race.race_id, formattedDate)}
        key={race.race_id}>{formattedDate}
      </Button>
    </li>
    </div>
  }
  );

  return (
    <>
      {archiveRacesList}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Race Id: {modalRaceId}</p>
          {modalRaceInfo && modalRaceInfo.map((racePosition, index) => (<li key={index}>{racePosition}</li>)

          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


}

export default ListArchiveRaces;