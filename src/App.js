import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteMovie(id) {
    axios
      .delete(`http://localhost:9000/api/movies/` + id)
      .then((res) => {
        if (res.status === 200) {
          console.log("silme işlemi başarılı, arayüzden kaldır");
          setMovies(res.data);
          push("/");
        }
      })
      .catch((err) => console.log(err));
  }
  console.log(movies);

  const addToFavorites = (movie) => {
    /* favoriteMovies.find(movie) == -1
      ? setFavoriteMovies([...favoriteMovies, movie])
      : console.log("film zaten var"); */
  };
  console.log(favoriteMovies);

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route exact path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route exact path="/movies/:id">
              <Movie handleDelete={deleteMovie} handleFav={addToFavorites} />
            </Route>

            <Route exact path="/movies/add/1">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route exact path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
