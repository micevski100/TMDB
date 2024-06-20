import { useEffect, useState } from "react";
import ApiManager from "../services/api/ApiManager";
import { Movie } from "../services/models/Movie";
import Row from "../components/Row/Row";
import Banner from "../components/Banner/Banner";

type MovieCategoryTuple = [string, Movie[]];

const HomePage = () => {
  const [movies, setMovies] = useState<MovieCategoryTuple[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setError("");
      try {
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
          console.error(
            "Failed to fetch recommended Movies and TV-Shows.",
            result.errorValue
          );
          setError("Failed to fetch recommended Movies and TV-Shows.");
        }
      } catch (error) {
        console.error("Failed to fetch recommended Movies and TV-Shows.");
        setError("Failed to fetch recommended Movies and TV-Shows.");
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

  const randomMovie = getRandomMovie();

  return (
    <>
      {error && <h1 className='text-center mt-5'>{error}</h1>}
      {!error && (
        <>
          <Banner movie={randomMovie} />
          <div className='ms-5'>
            {movies.map(([categoryName, movieList]) => (
              <Row key={categoryName} title={categoryName} movies={movieList} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
