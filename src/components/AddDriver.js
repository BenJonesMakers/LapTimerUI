import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';

const AddDriver = () => {
  const [validated, setValidated] = useState(false);
  const [transponderValue, setTransponderValue] = useState('');
  const [realNameValue, setRealNameValue] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    postNewDriver(transponderValue, realNameValue);
    setValidated(true);
  };

  const postNewDriver = (transponderValue, realNameValue) => {
    fetch('http://localhost:3000/drivers/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ transponderId: transponderValue, realName: realNameValue })
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      })
  }


  return (
    <div style={{ width: "300px" }}>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formAddDriver">
          <Form.Label>Add Driver</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>Transponder</InputGroup.Text>
            <FormControl
              required
              aria-label="Transponder Text"
              value={transponderValue}
              onChange={e => setTransponderValue(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl
              required
              aria-label="Name Text"
              value={realNameValue}
              onChange={e => setRealNameValue(e.target.value)} />
          </InputGroup>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddDriver;