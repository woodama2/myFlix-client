// src/components/profile-view/profile-view.jsx
import React, {useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


// Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };

export const ProfileView = ({ user, onUserUpdate, onLoggedOut }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    password: "",
    email: user.email,
    birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '' // Extract date part only
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleEditModalOpen = () => setShowEditModal(true);
  const handleEditModalClose = () => setShowEditModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(updatedUser => {
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert("Your profile has been updated successfully.");
        onUserUpdate(updatedUser); // Update state in MainView
        handleEditModalClose();
      } else {
        alert("An error occurred while updating your profile.");
      }
    })
    .catch(error => {
      console.error("Error", error);
      alert("An error occurred while updating your profile.");
    });
  };

  const handleDeregister = () => {
    const confirmDeregister = window.confirm(
      "Are you sure you want to delete your account?  This action cannot be undone."
    );
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    onLoggedOut(); // Should clear localStorage
    navigate("/login") // Redirect to login page
  }


    if (confirmDeregister) {
      fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/users/${user.username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been successfully deleted.");
          onLoggedOut();
          navigate("/login");
        } else {
          alert("An error occurred while trying to delete your account.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while trying to delete your account.");
      });
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : 'Not specified'}</p>
      <p>Favorites: {user.favorites.join(", ")}</p>
      <Button variant="primary" onClick={handleEditModalOpen}>Edit Profile</Button>

      <Button variant="warning" onClick={handleDeregister}>Deregister</Button>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                required
                minLength={3}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="passwordInput"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
                minLength={8}
              />
              <Form.Check
                type="checkbox"
                label="Show Password"
                id="showPasswordCheck"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};
