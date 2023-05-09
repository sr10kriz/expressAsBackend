import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

// const api = "http://localhost:5000/";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const event = { occation: "Ballon D'or", occationDate: "June27th" };
  const expressPostHandler = async () => {
    console.log("Express Handler Post");
    try {
      const apiCallPost = await axios.post("http://localhost:5000/post", event);
      console.log("apiCallPost", apiCallPost);
    } catch (e) {
      console.log("post err", e);
    }
  };
  const expressGetHandler = async () => {
    console.log("Express Handler Get");
    try {
      const apiCallGet = await axios.get("http://localhost:5000/get");
      console.log("apiCallGet", apiCallGet);
    } catch (e) {
      console.log("get err", e);
    }
  };

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={expressPostHandler}>Express Post</button>
        <button onClick={expressGetHandler}>Express Get</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
