import { useState, useEffect } from "react";
import CardsList from "../components/CardsList";
import { Movie } from "../services/models/Movie";
import ApiManager from "../services/api/ApiManager";

const SeriesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const result = await ApiManager.shared.discoverTVShows();
        if (result.isSuccess && result.getValue()) {
          setMovies(result.getValue()!.results);
        } else {
          console.error("Failed to fetch tv-shows:", result.errorValue);
          setError("Failed to fetch tv-shows");
        }
      } catch (error) {
        console.error("Error fetching tv-shows:", error);
        setError("Failed to fetch tv-shows.");
      }
    })();
  }, []);

  return (
    <div>
      <h1 className='ms-5'>TV Shows</h1>
      {error && <p>{error}</p>}
      {!error && <CardsList movies={movies} />}
    </div>
  );
};

export default SeriesPage;
