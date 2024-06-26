import { MoviesResult } from "../services/models/Movie";
import { json, useLoaderData } from "react-router-dom";
import { Result } from "../services/api/Result";
import CardsList from "../components/CardsList";
import ApiManager from "../services/api/ApiManager";

const FilmsPage = () => {
  const data = useLoaderData() as Result<MoviesResult>;
  const movies = data.getValue()?.results || [];

  return <CardsList movies={movies} />;
};

export default FilmsPage;

export const loader = async () => {
  try {
    const response: Result<MoviesResult> =
      await ApiManager.shared.discoverMovies();
    if (response.isSuccess) {
      return response;
    } else {
      return json({ message: "Could not fetch tv-shows" }, { status: 500 });
    }
  } catch (error) {
    console.error("Failed to fetch tv-shows.");
    return json({ message: "Failed to fetch tv-shows." }, { status: 500 });
  }
};
