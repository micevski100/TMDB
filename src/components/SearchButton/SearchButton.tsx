import { useEffect, useRef, useState } from "react";
import "./SearchButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchButton = () => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!active && inputRef) {
      inputRef.current.value = "";
    }
  }, [active]);

  return (
    <div className='container'>
      <div className='searchBar'>
        <input
          type='text'
          ref={inputRef}
          className={active ? "input active" : "input"}
          placeholder='Titles, people, genres'
        />
        <button
          className='btn'
          type='submit'
          onClick={() => setActive(!active)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
