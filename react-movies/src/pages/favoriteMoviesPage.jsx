import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getFavourites } from "../api/tmdb-api";

import { AuthContext } from "../contexts/authContext";

const FavoriteMoviesPage = () => {
  const { token } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!token) {
  setFavourites([]);
  setLoading(false);
  return;
}

    const loadFavourites = async () => {
      try {
  const data = await getFavourites(token);


const mappedMovies = data.map((fav) => ({
  id: fav.movieId,
  title: fav.title,
  poster_path: null,
  release_date: "N/A",
  vote_average: "N/A",
}));

setFavourites(mappedMovies);

        setLoading(false);
      } catch (err) {
        console.error("Failed to load favourites", err);
        setLoading(false);
      }
    };

    loadFavourites();
  }, [token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="My Favourite Movies (MongoDB)"
      movies={favourites}
      action={() => null}
    />
  );
};

export default FavoriteMoviesPage;
