import { useState, useEffect } from "react";
import CardsList from "../components/CardsList";
import { Movie } from "../services/models/Movie";
import ApiManager from "../services/api/ApiManager";

const FilmsPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const result = await ApiManager.shared.discoverMovies();
        if (result.isSuccess && result.getValue()) {
          setMovies(result.getValue()!.results);
        } else {
          console.error("Failed to fetch movies:", result.errorValue);
          setError("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies.");
      }
    })();
  }, []);

  return (
    <div>
      <h1 className='ms-5'>Movies</h1>
      {error && <p>{error}</p>}
      {!error && <CardsList movies={movies} />}
    </div>
  );
};

export default FilmsPage;
