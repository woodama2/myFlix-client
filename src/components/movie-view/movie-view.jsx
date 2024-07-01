import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({movies}) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);


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
        <button className="back-button" style={{cursor: "pointer"}}>Back</button>
      </Link>
    </div>
  );
};