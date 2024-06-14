import "./Banner.css";
import { Movie } from "../../services/models/Movie";

const base_url = "https://image.tmdb.org/t/p/original";

const Banner: React.FC<{ movie?: Movie }> = ({ movie }) => {
  function truncate(str: string | undefined, n: number): string {
    if (!str) return "";
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <div
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}/${movie?.backdrop_path})`,
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie?.original_title}</h1>

        <div className='banner__buttons d-flex'>
          <div className='banner_button'>Play</div>
          <div className='banner_button'>My List</div>
        </div>

        <h1 className='banner__description'>
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
