import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from "react-router-dom"; // import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'

import {setMovies, setUser} from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import {RegistrationView} from "../registration-view/registration-view";
import {LoginView} from "../login-view/login-view";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {DirectorView} from "../director-view/director-view";
import {PhaseView} from "../phase-view/phase-view";
import {ProfileView} from "../profile-view/profile-view";

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // no initial state as we use Redux

  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get("https://marvelix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Update with React Redux Code
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // action setMovies and setUser is used here
    let { movies, user } = this.props;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    //if (!user) return <div className="main-view"/>;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view">LOADING</div>;

    return (
      <Router>
        <Container fluid="md" className="main-view">
          { user && 
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="mb-5">
              <LinkContainer to="/">
                <Navbar.Brand>MARVELIX</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Item>
                    <LinkContainer to={`/users/${user}`}>
                      <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <Button onClick={this.onLogOut} variant="warning" type="submit" className="button logout">Log Out</Button>
                  </Nav.Item>                  
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          }
          <Row className="ml-0 mr-0 justify-content-around">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies}/>;
              }
            }/>
          </Row>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route exact path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
          }} />
          <Route exact path="/phases/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <PhaseView phase={movies.find(m => m.Phase.Name === match.params.name).Phase}/>
          }} />
          <Route exact path="/users/:username" render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							if (movies.length === 0) return;
							return <ProfileView movies={movies} />;
					}} />
        </Container>
      </Router>


    /*
    <div className="main-view">
      <Container fluid="md">
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
              <Navbar.Brand href="#home">MARVELIX</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="">Profile</Nav.Link>
                  <Button onClick={this.onLogOut} variant="danger" type="submit" className="button logout">Log Out</Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        <Row className="ml-0 mr-0">
          {selectedMovie
          ? <MovieView movie={selectedMovie}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
          }
        </Row>
      </Container>
    </div>
    */


    );
  }
}

let mapStateToProps = state => {
  return {movies: state.movies, user: state.user}
}

export default connect(mapStateToProps, {setMovies, setUser})(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Phase: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    })
  ),
  user: PropTypes.string.isRequired
};
