export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div onClick={() => {onMovieClick(movie);}}>{movie.title}</div>
  );
};

// OR
// export const MovieCard = (props) => {
//   return <div>{props.movie.title}</div>
// };