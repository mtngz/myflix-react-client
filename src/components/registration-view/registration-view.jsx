import React, { useState } from 'react';
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function RegistrationView (props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://marvelix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <Container>
    <h1>Sign Up to MARVELIX</h1>
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" /> 
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" /> 
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter Date of Birth: </Form.Label>
        <Form.Control type="text" value={birthday} onChange={(e)=> setBirthday(e.target.value)} placeholder="MM-DD-YYYY" />
      </Form.Group>
    </Form>
    <Button type="submit" variant="info" onClick={handleSubmit}>Sign Up</Button>
  </Container>
  );
};

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired
  })
};