import React, { useState, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [searchFilter, setSearchFilter] = useState(""); // Search state
  const [displayedMovies, setDisplayedMovies] = useState(movies); // State for filtered movies

  const genreId = Number(genreFilter);

  //  useEffect to handle filtering
  useEffect(() => {
    let filteredMovies = movies;
    
    // Filter by search term 
    if (searchFilter) {
      filteredMovies = filteredMovies.filter((m) => 
        m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (m.overview && m.overview.toLowerCase().includes(searchFilter.toLowerCase()))
      );
    }
    
    
    if (nameFilter) {
      filteredMovies = filteredMovies.filter((m) => 
        m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1
      );
    }
    
    // Filter by genre 
    if (genreId > 0) {
      filteredMovies = filteredMovies.filter((m) => 
        m.genre_ids.includes(genreId)
      );
    }
    
    setDisplayedMovies(filteredMovies);
  }, [searchFilter, nameFilter, genreFilter, movies, genreId]);

  // handleChange to include search
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "search") setSearchFilter(value); 
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            searchFilter={searchFilter} // Pass search filter
          />
        </Grid>
        
        {/* Shows movie count and use displayedMovies */}
        <Grid size={{xs: 12, sm: 6, md: 8, lg: 9, xl: 10}} sx={{padding: "20px"}}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            {displayedMovies.length > 0 
              ? `${title} (${displayedMovies.length} movies)`
              : `${title} - No movies found`}
          </Typography>
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;