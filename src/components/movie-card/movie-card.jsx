import PropTypes from 'prop-types';

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>
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