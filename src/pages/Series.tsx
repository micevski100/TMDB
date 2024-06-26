import { json, useLoaderData } from "react-router-dom";

import ApiManager from "../services/api/ApiManager";
import { MoviesResult } from "../services/models/Movie";
import CardsList from "../components/CardsList";
import { Result } from "../services/api/Result";

const SeriesPage = () => {
  const data = useLoaderData() as Result<MoviesResult>;
  const series = data.getValue()?.results || [];

  return (
    <div>
      <CardsList movies={series} />
    </div>
  );
};

export default SeriesPage;

export const loader = async () => {
  try {
    const response: Result<MoviesResult> =
      await ApiManager.shared.discoverTVShows();
    if (response.isSuccess) {
      console.log(response);
      return response;
    } else {
      return json({ message: "Could not fetch tv-shows" }, { status: 500 });
    }
  } catch (error) {
    console.error("Failed to fetch tv-shows.");
    return json({ message: "Failed to fetch tv-shows." }, { status: 500 });
  }
};
