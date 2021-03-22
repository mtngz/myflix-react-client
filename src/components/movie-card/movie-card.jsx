import React from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
    <Card style={{ width: '16rem' }} bg="danger" text="white" border="primary" className="mb-5">
      <Card.Img variant="top" width={256} height={414} src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
      <Card.Footer>
      <Link to={`/movies/${movie._id}`}>
          <Button variant="light" block>Open</Button>
        </Link>
      </Card.Footer>
    </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
};