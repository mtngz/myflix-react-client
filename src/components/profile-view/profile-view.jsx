import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Tabs, Tab } from 'react-bootstrap';
import Row from "react-bootstrap/Row";

export class ProfileView extends React.Component {
	constructor() {
		super();
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthday: null,
			Favorites: [],
			validated: null,
		};
	}

	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.getUser(accessToken);
		}
	}

	getUser(token) {
		const username = localStorage.getItem('user');
		axios
			.get(`https://marvelix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
					Favorites: response.data.Favorites,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleRemoveFavorite(e, movie) {
		e.preventDefault();

		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.delete(`https://marvelix.herokuapp.com/users/${username}/Favorites/${movie}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert('Movie removed from favorites');
				this.componentDidMount();
				// window.open('_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
		this.setState({
			validated: null,
		});

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				validated: true,
			});
			return;
		}
		e.preventDefault();

		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		axios({
			method: 'put',
			url: `https://marvelix.herokuapp.com/users/${username}`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				Username: newUsername ? newUsername : this.state.Username,
				Password: newPassword ? newPassword : this.state.Password,
				Email: newEmail ? newEmail : this.state.Email,
				Birthday: newBirthday ? newBirthday : this.state.Birthday,
			},
		})
			.then((response) => {
				alert('Saved Changes');
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
				});
				localStorage.setItem('user', this.state.Username);
				window.open(`/users/${username}`, '_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	setUsername(input) {
		this.Username = input;
	}

	setPassword(input) {
		this.Password = input;
	}

	setEmail(input) {
		this.Email = input;
	}

	setBirthday(input) {
		this.Birthday = input;
	}

	handleDeregister(e) {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		axios
			.delete(`https://marvelix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				alert('Your account has been deleted');
				window.open(`/`, '_self');
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { Favorites, validated } = this.state;
		const username = localStorage.getItem('user');
		const { movies } = this.props;

		return (
			<Container className="profile-view">
				<Tabs defaultActiveKey="profile" transition={false} className="profile-tabs">
					<Tab className="tab-item" eventKey="profile" title="Profile">
					<Container className="profile-card">
							<h3 className="profile-title m-2" style={{ color: "blue"}}>{username}'s Favorite Movies</h3>
							<Row className="ml-0 mr-0 justify-content-around">
								{Favorites.length === 0 && <div className="card-content">You have no favorite movies.</div>}

								
									{Favorites.length > 0 &&
										movies.map((movie) => {
											if (movie._id === Favorites.find((favMovie) => favMovie === movie._id)) {
												return (
													
														<Card style={{ width: '16rem' }} className="mb-5" key={movie._id}>
															<Card.Img variant="top" width={256} height={414} src={movie.ImagePath} />
															<Card.Body className="movie-card-body text-center">
																<Card.Title className="movie-card-title">{movie.Title}</Card.Title>
															</Card.Body>
															<Card.Footer>
																<Button size="sm" block className="profile-button remove-favorite" variant="outline-danger" onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
																	Remove from Favorites
																</Button>
															</Card.Footer>
														</Card>
													
												);
											}
										})}
								
							</Row>
						</Container>
					</Tab>
					<Tab className="tab-item" eventKey="update" title="Update">
						<Card className="update-card">
							<h3 className="profile-title m-2" style={{ color: "blue"}}>Update {username}'s Profile</h3>
							<Card.Body>
								<Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
									<Form.Group controlId="formBasicUsername">
										<Form.Label className="form-label">Username</Form.Label>
										<Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} pattern="[a-zA-Z0-9]{2,}" />
										<Form.Control.Feedback type="invalid">Please enter a valid username with at least 2 alphanumeric characters.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicPassword">
										<Form.Label className="form-label">
											Password<span className="required">*</span>
										</Form.Label>
										<Form.Control type="password" placeholder="Current or New Password" onChange={(e) => this.setPassword(e.target.value)} pattern=".{2,}" required />
										<Form.Control.Feedback type="invalid">Please enter a valid password with at least 2 characters.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicEmail">
										<Form.Label className="form-label">Email</Form.Label>
										<Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
										<Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicBirthday">
										<Form.Label className="form-label">Birthday</Form.Label>
										<Form.Control type="date" placeholder="MM-DD-YYYY" onChange={(e) => this.setBirthday(e.target.value)} />
										<Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
									</Form.Group>
									<Button className="update profile-button" type="submit">
										Update
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Tab>

					<Tab className="tab-item" eventKey="delete" title="Delete Profile">
						<Card className="update-card">
							<h3 className="profile-title m-2" style={{ color: "blue"}}>Delete {username}'s Profile</h3>
							<Card.Body>
								<Button className="profile-button delete-button" variant="danger" block onClick={(e) => this.handleDeregister(e)}>
									Click Here If You're Sure You Want To Delete Your Profile
								</Button>
							</Card.Body>
						</Card>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

ProfileView.propTypes = {
	user: PropTypes.shape({
		Favorites: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				Title: PropTypes.string.isRequired,
			})
		),
		Username: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.string,
	}),
};