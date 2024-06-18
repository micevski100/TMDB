import { useEffect, useState } from "react";
import ApiManager from "../services/api/ApiManager";
import { Movie } from "../services/models/Movie";
import Row from "../components/Row/Row";
import Banner from "../components/Banner/Banner";

type MovieCategoryTuple = [string, Movie[]];

const HomePage = () => {
  const [movies, setMovies] = useState<MovieCategoryTuple[]>([]);
  useEffect(() => {
    (async () => {
      const result = await ApiManager.shared.getMovieRecommendations();
      if (result.isSuccess && result.getValue()) {
        const movieCategories = result
          .getValue()!
          .map(
            ([categoryName, moviesResult]) =>
              [categoryName, moviesResult.results] as MovieCategoryTuple
          );
        setMovies(movieCategories);
      } else {
        console.error("Failed to fetch movie categories:", result.errorValue);
      }
    })();
  }, []);

  const getRandomMovie = (): Movie | undefined => {
    const allMovies = movies.flatMap(([, movies]) => movies);
    if (allMovies.length === 0) {
      return undefined;
    }
    return allMovies[Math.floor(Math.random() * allMovies.length)];
  };

  const randomMovie = getRandomMovie(); // Call getRandomMovie here

  return (
    <>
      <Banner movie={randomMovie} /> {/* Pass randomMovie directly */}
      <div className='ms-5'>
        {movies.map(([categoryName, movieList]) => (
          <Row key={categoryName} title={categoryName} movies={movieList} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
