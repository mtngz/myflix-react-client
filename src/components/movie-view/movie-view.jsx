import React from 'react';
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addToFavorites = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://marvelix.herokuapp.com/users/${username}/Favorites/${this.props.movie._id}`,{},{
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert(`${this.props.movie.Title} added to favorites`)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Row sm={1} md={2}>
        <Col><img width={256} height={414} className="movie-poster" src={movie.ImagePath} alt="Movie Poster" /></Col>
        <Col><h3>{movie.Title}</h3>
          <p className="movie-description">{movie.Description}</p>
          <p className="movie-phase">
            <span className="label">Phase: </span>
            <span className="value"><Link to={`/phases/${movie.Phase.Name}`}>{movie.Phase.Name}</Link></span>
          </p>
          <p className="movie-director">
            <span className="label">Director: </span>
            <span className="value"><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></span>
          </p>
          <Button onClick={() => window.open("/", "_self")} variant="secondary" className="mr-3">Back</Button>
          <Button onClick={this.addToFavorites} variant="success">Add to favorites</Button>
          </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Phase: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  })
};