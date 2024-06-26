import { useLoaderData, json } from "react-router-dom";
import ApiManager from "../services/api/ApiManager";
import { Movie } from "../services/models/Movie";
import Row from "../components/Row/Row";
import Banner from "../components/Banner/Banner";
import { Result } from "../services/api/Result";
import { MoviesResult } from "../services/models/Movie";

const HomePage = () => {
  const data = useLoaderData() as Result<[string, MoviesResult][]>;
  const movies = data.getValue() as [string, MoviesResult][];

  const getRandomMovie = (): Movie | undefined => {
    const allMovies = movies.flatMap(([, movies]) => movies.results);
    if (allMovies.length === 0) {
      return undefined;
    }
    return allMovies[Math.floor(Math.random() * allMovies.length)];
  };

  const randomMovie = getRandomMovie();

  return (
    <>
      <Banner movie={randomMovie} />
      <div className='ms-5'>
        {movies.map(([categoryName, movieList]) => (
          <Row
            key={categoryName}
            title={categoryName}
            movies={movieList.results}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;

export const loader = async () => {
  try {
    const response: Result<[string, MoviesResult][]> =
      await ApiManager.shared.getMovieRecommendations();

    if (response.isSuccess) {
      return response;
    } else {
      return json(
        { message: "Could not fetch movie recommendations." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to fetch recommended Movies and TV-Shows.");
    return json(
      { message: "Failed to fetch recommended Movies and TV-Shows." },
      { status: 500 }
    );
  }
};
