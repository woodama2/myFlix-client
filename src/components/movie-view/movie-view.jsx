import "./movie-view.scss";

export const MovieView = ({movie, onBackClick}) => {
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
      <button onClick={onBackClick} className="back-button" style={{cursor: "pointer"}}>Back</button>
    </div>
  );
};