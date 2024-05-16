import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
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
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};