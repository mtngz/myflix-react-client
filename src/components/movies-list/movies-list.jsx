import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import {Container, Row} from "react-bootstrap";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <Container className="ml-0 mr-0">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    <Row className="movies-list justify-content-around">
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
    </Row>
  </Container>;
}

export default connect(mapStateToProps)(MoviesList);