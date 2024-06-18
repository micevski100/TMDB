import { Movie } from "../services/models/Movie";
import { FAVORITES } from "../Dataholder";
import { useState } from "react";

const Card: React.FC<{ movie: Movie }> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/original";

  const [alreadyInFavorites, setAlreadyInFavorites] = useState<boolean>(
    FAVORITES.some((item) => item.id === movie.id)
  );

  const handleAddToFavoritesBtnClick = () => {
    FAVORITES.push(movie);
    setAlreadyInFavorites(true);
  };

  return (
    <div className='card__container'>
      <img
        className='row__poster'
        src={`${base_url}/${movie.backdrop_path ?? movie.poster_path}`}
      />
      {!alreadyInFavorites && (
        <button className='btn' onClick={handleAddToFavoritesBtnClick}>
          +
        </button>
      )}
    </div>
  );
};

export default Card;
