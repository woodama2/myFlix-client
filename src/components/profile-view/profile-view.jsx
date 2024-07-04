// src/components/profile-view/profile-view.jsx
import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import './profile-view.css'


// Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };

export const ProfileView = ({ movies, onUserUpdate, onLoggedOut }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { movieId } = useParams();
  // const user = JSON.parse(localStorage.getItem("user"));

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    password: "",
    email: user.email,
    birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '' // Extract date part only
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  // const favoriteMovies = movies.filter(m => user.favorites.includes(m._id));

  // useEffect(() => {
  //   const fetchFavoriteMovies = async () => {
  //     if (user.favorites.length > 0) {
  //       try {
  //         const promises = user.favorites.map((movieId) =>
  //       fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/movies/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch movie');
  //         }
  //         return response.json();
  //       })
  //       .catch(error => {
  //         console.error("Error fetching movie detauls:", error);
  //         return null;
  //       })
  //     );
  //     const movieDetails = await Promise.all(promises);
  //     setFavoriteMovies(movieDetails.filter(movie => movie !== null));
  //       } catch (error) {
  //         console.error("Error fetching movie details:", error);
  //       }
  //     }
  //   };

  //   fetchFavoriteMovies();
  // }, [user.favorites, token]);

  // useEffect(() => {
  //   if (user.favorites.length > 0) {
  //     // Map the array of movie IDs to fetch requests
  //     const fetchPromises = user.favorites.map((movieId) =>
  //   fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/movies/${encodeURIComponent(movieId)}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch movie');
  //     }
  //     return response.json();
  //   })
  //   .catch(error => {
  //     console.error("Error fetching movie details:", error);
  //     return null;
  //   })
  // );

  // Execute all fetch requests and handle them together
  // const movieDetails = await Promise.all(fetchPromises)
  // .then((movieDetails) => {
  //   // Filter out any null responses
  //   const filteredMovies = movieDetails.filter(movie => movie !== null);
  //   // Update state with all fetch movies at once
  //   setFavoriteMovies(filteredMovies);
  // })
  // .catch((error) => {
  //   console.error("Error fetching movies:", error);
  // });
  //   } else {
  //     // If user has no favorites, set favoriteMovies to an empty array
  //     setFavoriteMovies([]);
  //   }

  // //     Promise.all(user.favorites.map((movieId) =>
  // //   fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/movies/`, {
  // //     headers: {
  // //       Authorization: `Bearer ${token}`,
  // //     }
  // //   })
  // //   .then((response) => response.json())
  // //   .catch((error) => console.error("Error fetching movie details:", error))
  // // )).then(setFavoriteMovies);
  // //   }
  // }, [user.favorites, token]);

  // const favoriteMovies = user.favorites;

  const favMovies = 
  user &&
  movies &&
  movies.filter((movie) => user.favorites.includes(movie.id));

  const handleEditModalOpen = () => setShowEditModal(true);
  const handleEditModalClose = () => setShowEditModal(false);


  // Edit Profile Form
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Hash the password if it's provided and has changed
    // const updatedFormData = { ...formData };
    // if (formData.password) {
    //   updatedFormData.password = bcrypt.hashSync(formData.password, 10);
    // }

    // // Ensure password is hashed before sending to backend
    // const hashedPassword = formData.password
    // ? userSchema.statics.hashPassword(formData.password)
    // : undefined;

    // // Prepare updated user data with hashed password
    // const updatedUserData = {
    //   username: formData.username,
    //   email: formData.email,
    //   birthday: formData.birthday,
    //   password: hashedPassword, // Include hashed password in update
    // };

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
      console.log("Updated User:", updatedUser); // Log the updated user object
      if (updatedUser) {
        // Store updated user in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Stored User:", storedUser); // Log the user data stored in localStorage
        alert("Your profile has been updated successfully.");
        onUserUpdate(updatedUser); // Update state in MainView
        handleEditModalClose();
      } else {
        alert("An error occurred while updating your profile.");
      }
    })
    .catch(error => {
      console.error("Error updating profile:", error); // Log the specific error
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

  const removeFav = (movieId) => {
    fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/users/${user.username}/${encodeURIComponent(movieId)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        onUserUpdate(updatedUser);
        alert("Movie removed from favorites");
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : 'Not specified'}</p>

      <h3>Favorite Movies</h3>

      {favMovies && 
      favMovies.map((movie) => {
        return (
          <div className="card-container" key={movie.id}>
          <Card className="h-100" style={{width: '12rem '}}>
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
          // <div onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>
        );


        return <p>{movie.Title}</p>
      })}

      {/* <p>{user.favorites.join(", ")}</p> */}
      <p></p>
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
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Genre: PropTypes.string,
  })).isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};
