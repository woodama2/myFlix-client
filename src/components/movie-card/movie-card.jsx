import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
  onMovieClick: PropTypes.func.isRequired
};