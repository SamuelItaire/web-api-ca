import React, { useState } from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import MoviePagination from '../components/pagination';

const TrendingMoviesPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  
    // Handles page change when user navigates pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['trending', currentPage],
    queryFn: () => getTrendingMovies(currentPage),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data?.results || []; // ERROR HANDLING
  const totalPages = data ? Math.min(data.total_pages, 20) : 1;

  return (
    <>
      <PageTemplate
        title="Trending Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      {/* PAGINATION */}
      <MoviePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} 
      />
    </>
  );
};

export default TrendingMoviesPage;