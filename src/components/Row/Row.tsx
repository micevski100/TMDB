import "./Row.css";
import { Movie } from "../../services/models/Movie";
import Card from "../Card";

const Row: React.FC<{ title: string; movies: Movie[] }> = ({
  title,
  movies,
}) => {
  return (
    <div className='mt-5'>
      <h4 className='ms-1 mb-3'>{title}</h4>

      <div className='row row__posters flex-nowrap overflow-auto ms-1'>
        {movies.map((item) => (
          <div key={item.id} className='col-2 p-0 me-2'>
            <Card movie={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
