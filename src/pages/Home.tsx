import { useEffect } from "react";
import ApiManager from "../services/api/ApiManager";

const HomePage = () => {
  useEffect(() => {
    console.log("asd");
    (async () => {
      const result = await ApiManager.shared.popularMovies();
      console.log(result.getValue());
    })();
  }, []);

  return <h1>Home Page</h1>;
};

export default HomePage;
