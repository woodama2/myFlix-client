import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      genre: "Biography",
      image: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/dV1vfa4w_dB4wzk7A_VzThWUWw8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzEyZDMyYjZmLThmNzAtNDliNC1hMjFmLTA2ZWY4M2UyMjJhMi5qcGc=",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "Barbie",
      description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      genre: "Adventure",
      image: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13472534_p_v12_ah.jpg",
      director: "Greta Gerwig",
    },
    {
      id: 3,
      title: "Killers of the Flower Moon",
      description: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one - until the FBI steps in to unravel the mystery.",
      genre: "Crime",
      image: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/200x0/v2/https://resizing.flixster.com/GGQKtXozu58SHWKH0Cz-5jQ9U38=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzZhOWE1N2ZkLTY4MzgtNDA3Yi05MDEwLWQzN2QwMTFkZDdmNS5qcGc=",
      director: "Martin Scorsese",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />);
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }

  return (
    <div>
      {movies.map((movie) => (
          <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
      ))}
    </div>
  );
}