import { Movie } from "../services/models/Movie";

const Card: React.FC<{ movie: Movie }> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/original";
  return (
    <img
      className='row__poster'
      src={`${base_url}/${movie.backdrop_path ?? movie.poster_path}`}
    />
  );
};

export default Card;
