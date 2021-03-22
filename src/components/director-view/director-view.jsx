import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return(
      <Container className="director-view">
        <Card style={{ width: "30rem" }} className="phase-card" bg="primary" text="white" border="primary">
        <Card.Header>{director.Name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>{director.Bio}</p>
              <p>Born: {director.Birth}</p>
            </Card.Text>
            <Link to={"/"}>
              <Button variant="secondary" className="button-back">All Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
};