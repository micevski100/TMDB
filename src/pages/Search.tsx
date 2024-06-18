import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Movie } from "../services/models/Movie";
import Card from "../components/Card";
import ApiManager from "../services/api/ApiManager";
import CardsList from "../components/CardsList";

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async (query: string) => {
      setError("");

      try {
        const response = await ApiManager.shared.search(query);
        if (response.isSuccess && response.getValue()) {
          setSearchResults(response.getValue()!.results);
        } else {
          setError("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results");
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [location]);

  return (
    <div>
      <h1 className='ms-5'>Search Results for: {searchQuery}</h1>
      {error && <p>{error}</p>}
      {!error && <CardsList movies={searchResults} />}
    </div>
  );
};

export default SearchPage;
