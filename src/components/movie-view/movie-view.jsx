import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";

export const MovieView = ({movies, onUserUpdate }) => {
  const { movieId } = useParams();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const movie = movies.find((b) => b.id === movieId);

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
    <div>
      <div>
        <img src={movie.Image} className="w-100" style={{ height: 'auto' }} alt="Movie Poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured ? "True" : "False"}</span>
      </div>
      <Link to={`/`}>
        <Button variant="primary" className="me-2" style={{cursor: "pointer"}}>Back</Button>
      </Link>
      { isFavorite ? (
          <Button variant="outline-secondary" onClick={removeFav}>Remove from Favorites</Button>
        ) : (
          <Button variant="outline-primary" onClick={addFav}>Add to Favorites</Button>
        )} 
    </div>
  );
};