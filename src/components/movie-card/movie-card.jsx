import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie, onMovieClick, onUserUpdate }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isFavorite = user?.favorites?.includes(movie.id);

  const addFav = (e) => {
    e.preventDefault();
    fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/users/${user.username}/${encodeURIComponent(movie.id)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      // Call handleUserUpdate to update user state and localStorage
      onUserUpdate(updatedUser);
    })
    .then(movies => {
      alert("Movie added")
    })
    .catch(e => console.log(e))
  };

  const removeFav = (e) => {
    e.preventDefault();
    fetch(`https://stark-eyrie-86274-1237014d10af.herokuapp.com/users/${user.username}/${encodeURIComponent(movie.id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      // Call handleUserUpdate to update user state and localStorage
      onUserUpdate(updatedUser);
    })
    .then(movies => {
      alert("Movie deleted")
    })
    .catch(e => console.log(e))
  };

  
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        { isFavorite ? (
          <Button variant="outline-secondary" onClick={removeFav}>Remove from Favorites</Button>
        ) : (
          <Button variant="outline-primary" onClick={addFav}>Add to Favorites</Button>
        )} 
      </Card.Footer>
    </Card>
    // <div onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>
  );
};

// OR
// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>
// };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
  onUserUpdate: PropTypes.func.isRequired, // Ensure onUserUpdate is required prop
  // onMovieClick: PropTypes.func.isRequired
};