// src/components/profile-view/profile-view.jsx
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const ProfileView = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));

  const handleDeregister = () => {
    const confirmDeregister = window.confirm(
      "Are you sure you want to delete your account?  This action cannot be undone."
    );


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
      <h2>{user.username}'s Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
      <p>Favorites: {user.favorites.join(", ")}</p>
      <Button onClick={() => {
        onLoggedOut();
        navigate("/login");
      }}>Logout</Button>
      <Button variant="danger" onClick={handleDeregister}>Deregister</Button>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    Favorites: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired
};
