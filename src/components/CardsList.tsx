import { Movie } from "../services/models/Movie";
import Card from "./Card";

const CardsList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className='ms-5'>
      <div className='row'>
        {movies.map((movie) => (
          <div className='col-2 mt-3' key={movie.id}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsList;
