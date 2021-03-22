import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export class PhaseView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { phase } = this.props;

    if (!phase) return null;

    return (
      <Container className="phase-view">
        <Card style={{ width: "30rem" }} className="phase-card" bg="primary" text="white" border="primary">
          <Card.Header>Phase {phase.Name}</Card.Header>
          <Card.Body>
            <Card.Text>{phase.Description}</Card.Text>
            <Link to={"/"}>
              <Button variant="secondary" className="button-back">All Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

PhaseView.propTypes = {
  phase: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};