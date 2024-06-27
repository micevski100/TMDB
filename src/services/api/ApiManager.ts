import axios, { AxiosInstance } from "axios";
import { MoviesResult, Movie } from "../models/Movie";
import { Result } from "./Result";
import { BASE_URL, API_KEY } from "../../config/app.ts";

class ApiManager {
  public static shared = new ApiManager();
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 20000,
    });
  }

  private async makeRequest<T>(url: string, config = {}): Promise<Result<T>> {
    try {
      const response = await this.client.get(url, config);
      const data = response.data as T;
      if (!data) {
        throw new Error("No data received from the API");
      }
      return Result.ok<T>(data);
    } catch (e: any) {
      return this.handleError<T>(e);
    }
  }

  private handleError<T>(e: any): Result<T> {
    console.error("API Error:", e);
    if (e.response) {
      console.error("Response Data:", e.response.data);
      return Result.fail<T>(e.response.data.message);
    } else {
      return Result.fail<T>(e.message);
    }
  }

  async discoverMovies(): Promise<Result<MoviesResult>> {
    return this.makeRequest<MoviesResult>("/discover/movie", {
      params: { api_key: API_KEY },
    });
  }

  async discoverTVShows(): Promise<Result<MoviesResult>> {
    return this.makeRequest<MoviesResult>("/discover/tv", {
      params: { api_key: API_KEY },
    });
  }

  async search(query: string): Promise<Result<MoviesResult>> {
    const requestUrls = [
      `/search/movie?query=${query}`,
      `/search/tv?query=${query}`,
    ];

    try {
      const responses = await Promise.all(
        requestUrls.map((url) =>
          this.client.get(url, { params: { api_key: API_KEY } })
        )
      );

      const movies: Movie[] = responses[0].data.results;
      const tvShows: Movie[] = responses[1].data.results;
      const allResults: Movie[] = [...movies, ...tvShows];

      const result: MoviesResult = {
        page: 1,
        results: allResults,
        total_pages: 1,
        total_results: allResults.length,
      };

      return Result.ok<MoviesResult>(result);
    } catch (e: any) {
      return this.handleError<MoviesResult>(e);
    }
  }

  async getMovieRecommendations(): Promise<Result<[string, MoviesResult][]>> {
    const requests = [
      { name: "Popular Movies", url: "/movie/popular" },
      { name: "Top Rated Movies", url: "/movie/top_rated" },
      { name: "Now Playing", url: "/movie/now_playing" },
      { name: "Popular Series", url: "/tv/popular" },
      { name: "Top Rated Series", url: "/tv/top_rated" },
      { name: "Airing Today", url: "/tv/airing_today" },
    ];

    try {
      const responses = await Promise.all(
        requests.map((request) =>
          this.makeRequest<MoviesResult>(request.url, {
            params: { api_key: API_KEY, language: "en-US" },
          }).then((result) => ({
            name: request.name,
            result,
          }))
        )
      );

      const resultTuples = responses.map((response) => {
        if (response.result.isFailure) {
          console.error(
            `Failed to fetch ${response.name}: ${response.result.errorValue}`
          );
        }
        return [response.name, response.result.getValue()] as [
          string,
          MoviesResult
        ];
      });

      return Result.ok(resultTuples);
    } catch (e: any) {
      return this.handleError<[string, MoviesResult][]>(e);
    }
  }
}

export default ApiManager;
