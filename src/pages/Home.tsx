import { useEffect, useState } from "react";
import ApiManager from "../services/api/ApiManager";
import { Movie } from "../services/models/Movie";
import Row from "../components/Row/Row";
import Banner from "../components/Banner/Banner";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    (async () => {
      const result = await ApiManager.shared.popularMovies();
      const movies = result.getValue()!.results;
      setMovies(movies);
      console.log(movies);
      console.log(movies[Math.floor(Math.random() * (movies.length - 1))]);
    })();
  }, []);

  return (
    <>
      <Banner movie={movies[Math.floor(Math.random() * (movies.length - 1))]} />
      <div className='ms-5'>
        <Row title='Netflix Originals' movies={movies} />
        <Row title='Popular' movies={movies} />
        <Row title='Trending' movies={movies} />
      </div>
    </>
  );
};

export default HomePage;
