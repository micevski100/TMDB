import axios, { AxiosInstance } from "axios";
import { MoviesResult, Movie } from "../models/Movie";
import { Result } from "./Result";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "6162435e6c2e71b5828eef6cb250fc6f";

class ApiManager {
  public static shared = new ApiManager();
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${API_KEY}`,
      },
      timeout: 20000,
    });
  }

  private _get = (url: string, config = {}) => {
    return this.client.get(url, config);
  };

  private _put = (url: string, data = {}, config = {}) => {
    return this.client.put(url, data, config);
  };

  private _post = (url: string, data = {}, config = {}) => {
    return this.client.post(url, data, config);
  };

  async discoverMovies(): Promise<Result<MoviesResult>> {
    try {
      const response = await this._get("/discover/movie", {
        params: { api_key: API_KEY },
      });
      const moviesResult = response.data as MoviesResult;
      return Result.ok<MoviesResult>(moviesResult);
    } catch (e: any) {
      if (e.response) {
        return Result.fail<MoviesResult>(e.response.data.message);
      } else {
        return Result.fail<MoviesResult>(e.message);
      }
    }
  }

  async discoverTVShows(): Promise<Result<MoviesResult>> {
    try {
      const response = await this._get("/discover/tv", {
        params: { api_key: API_KEY },
      });
      const moviesResult = response.data as MoviesResult;
      return Result.ok<MoviesResult>(moviesResult);
    } catch (e: any) {
      if (e.response) {
        return Result.fail<MoviesResult>(e.response.data.message);
      } else {
        return Result.fail<MoviesResult>(e.message);
      }
    }
  }

  async search(query: string): Promise<Result<MoviesResult>> {
    const requestUrls = [
      `search/movie?query=${query}`,
      `search/tv?query=${query}`,
    ];

    try {
      const responses = await Promise.all(
        requestUrls.map((url) =>
          this._get(url, { params: { api_key: API_KEY } })
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
      if (e.response) {
        return Result.fail<MoviesResult>(e.response.data.message);
      } else {
        return Result.fail<MoviesResult>(e.message);
      }
    }
  }

  async getMovieRecommendations(): Promise<Result<[string, MoviesResult][]>> {
    const requests = [
      { name: "Popular Movies", url: "/movie/popular?language=en-US" },
      { name: "Top Rated Movies", url: "/movie/top_rated?language=en-US" },
      { name: "Now Playing", url: "/movie/now_playing?language=en-US" },
      { name: "Popular Series", url: "/tv/popular?language=en-US" },
      { name: "Top Rated Series", url: "/tv/top_rated?language=en-US" },
      { name: "Airing Today", url: "/tv/airing_today?language=en-US" },
    ];

    try {
      const responses = await Promise.all(
        requests.map((request) =>
          this._get(request.url, { params: { api_key: API_KEY } }).then(
            (response) => ({
              name: request.name,
              data: response.data as MoviesResult,
            })
          )
        )
      );

      const resultTuples = responses.map(
        (response) => [response.name, response.data] as [string, MoviesResult]
      );
      return Result.ok(resultTuples);
    } catch (e: any) {
      if (e.response) {
        return Result.fail<[string, MoviesResult][]>(e.response.data.message);
      } else {
        return Result.fail<[string, MoviesResult][]>(e.message);
      }
    }
  }
}

export default ApiManager;
