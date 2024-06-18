import CardsList from "../components/CardsList";
import { FAVORITES } from "../Dataholder";

const MyListPage = () => {
  return (
    <div>
      <h1 className='ms-5'>Favorites</h1>
      <CardsList movies={FAVORITES} />
    </div>
  );
};

export default MyListPage;
