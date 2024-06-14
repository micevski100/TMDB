import "./Row.css";
import { Movie } from "../../services/models/Movie";

const base_url = "https://image.tmdb.org/t/p/original";

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
            <img
              className='row__poster'
              src={`${base_url}/${item.backdrop_path}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
