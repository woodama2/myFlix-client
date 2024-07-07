import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col, Alert, Modal } from "react-bootstrap";

export const ProfileView = ({ user, movies, onLoggedOut, onUserUpdate, onUserDelete, token }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const favMovies = 
  user &&
  movies &&
  movies.filter((movie) => user.favorites.includes(movie.id));


  useEffect(() => {
    if (user.birthday) {
      setBirthday(new Date(user.birthday).toISOString().split('T')[0]);
    }
  }, [user.birthday]);

  const handleUpdate = async () => {
    const updatedUser = {
      username: username,
      email: email,
      birthday: birthday,
    };
    if (password) {
      updatedUser.password = password;
    }
    const success = await onUserUpdate(updatedUser);
    if (success) {
      setUpdateMessage('User updated successfully!');
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleDelete = async () => {
    const success = await onUserDelete(user.username);
    if (success) {
      onLoggedOut();
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2 className="profile-title">My Profile</h2>
        <hr className="profile-divider" />
        {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" onClick={handleUpdate} className="me=2">
            Update
          </Button>
          <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </Form>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Deleting Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this account?  This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowDeleteModal(false)}>
              Close
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <hr className="profile-divider" />
        <h3>Favorite Movies</h3>

        {favMovies &&
        favMovies.map((movie) => {
          return (
            <div className="card-container" key={movie.id}>
              <Card className="mb-4" md={4}>
                <Card.Img variant="top" src={movie.Image} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Genre}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline-secondary" onClick={() => removeFav(movie.id)}>Remove from Favorites</Button>
                </Card.Footer>
              </Card>
            </div>
          );

          return <p>{movie.Title}</p>
        })}

        <p></p>

      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    _is: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Genre: PropTypes.string,
  })),
  onLoggedOut: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};