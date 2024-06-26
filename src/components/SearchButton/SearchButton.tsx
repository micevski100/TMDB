import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchButton = () => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!active && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [active]);

  const handleSearchBtnClick = () => {
    if (!active || searchQuery.trim() === "") {
      setActive(!active);
      return;
    }

    console.log("phase 2");
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='container'>
      <div className='searchBar'>
        <input
          type='text'
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          ref={inputRef}
          className={active ? "input active" : "input"}
          placeholder='Titles, people, genres'
        />
        <button className='btn' type='submit' onClick={handleSearchBtnClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
