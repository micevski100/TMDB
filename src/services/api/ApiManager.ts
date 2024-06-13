import axios, { AxiosInstance } from "axios";
import { MoviesResult } from "../models/Movie";
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
        // If using a Bearer token, use the Authorization header:
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

  async popularMovies(): Promise<Result<MoviesResult>> {
    try {
      const response = await this._get(`/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
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
}

export default ApiManager;
