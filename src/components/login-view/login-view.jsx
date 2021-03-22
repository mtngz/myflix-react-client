import React, { useState } from 'react';
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Link} from "react-router-dom";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post(`https://marvelix.herokuapp.com/login`, {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container>
      <h1>Please log in to MARVELIX</h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" /> 
        </Form.Group>
      </Form>
      <Button type="submit" variant="success" onClick={handleSubmit}>Log In</Button>
      <Link to={`/register`}>
        <Button variant="link" className="button-register">Create new Account</Button>
      </Link>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};