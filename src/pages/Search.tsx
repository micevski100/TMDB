import { useLoaderData } from "react-router-dom";
import { MoviesResult } from "../services/models/Movie";
import { json } from "react-router-dom";
import { Result } from "../services/api/Result";
import CardsList from "../components/CardsList";
import ApiManager from "../services/api/ApiManager";

const SearchPage = () => {
  const data = useLoaderData() as Result<MoviesResult>;
  const movies = data.getValue()?.results || [];
  const searchQuery =
    new URLSearchParams(window.location.search).get("q") || "";

  return (
    <div>
      <h1 className='ms-5'>Search Results for: {searchQuery}</h1>
      <CardsList movies={movies} />
    </div>
  );
};

export default SearchPage;

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return json({ message: "Query parameter is missing" }, { status: 400 });
  }

  try {
    const response: Result<MoviesResult> = await ApiManager.shared.search(
      query
    );
    if (response.isSuccess) {
      return response;
    } else {
      return json(
        { message: "Could not fetch search results" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to fetch search results.", error);
    return json({ message: "Failed to fetch search results" }, { status: 500 });
  }
};
