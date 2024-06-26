import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://stark-eyrie-86274-1237014d10af.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Movies data: ", data);
      const moviesFromApi = data.map((data) => {
        return {
          id: data._id,
          Title: data.Title,
          Image: data.ImagePath,
          Description: data.Description,
          Genre: data.Genre.Name,
          Director: data.Director.Name,
          Featured: data.Featured
        };
      });

      setMovies(moviesFromApi);
    });
  }, [token]);

return (
  <Row className="justify-content-md-center">
    {!user ? (
      <Col md={5}>
        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token)}}/>
        or
        <SignupView />        
      </Col>
    ) : selectedMovie ? (
      <Col md={8}>
        <MovieView
        movie={selectedMovie}
       onBackClick={() => setSelectedMovie(null)}
       />
      </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} 
          />
        </Col>  
      ))}
      <Button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</Button>
      </>
    )}
  </Row>
)


  // if (!user) {
  //   return (
  //     <>
  //     <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token)}}/>
  //     or
  //     <SignupView />
  //     </>
  //   );
  // }

  // if (selectedMovie) {
  //   return (<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />);
  // }

  // if (movies.length === 0) {
  //   return <div>The list is empty!</div>
  // }

  // return (
  //   <div>
  //     {movies.map((movie) => (
  //         <MovieCard
  //         key={movie.id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }} />
  //     ))}
  //     <button onClick={() => {setUser(null); setToken(null);
  //     localStorage.clear(); }}>Logout</button>
  //   </div>
  // );
}