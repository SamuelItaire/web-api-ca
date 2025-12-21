import React, { useState } from "react";




export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
const [mustWatch, setMustWatch] = useState( [] );



const addToFavorites = async (movie) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,

      },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favourite");
    }

    console.log("Favourite saved to MongoDB");

    
  
  } catch (err) {
    console.error("Failed to add favourite", err);
  }
};






  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

 const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)){
      newMustWatch = [...mustWatch, movie.id];
    }
    else{
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch);
    console.log("Must Watch List:", newMustWatch); // Log the current must watch list
  };

   const removeFromMustWatch = (movie) => {
    setMustWatch( mustWatch.filter((mId) => mId !== movie.id) );
  };


   const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  console.log(myReviews);

   return (
    <MoviesContext.Provider
      value={{

        
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch, 
        addToMustWatch, 
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
