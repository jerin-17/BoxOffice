import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../Misc/config.js';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  
  const isShowSearch = searchOption === 'shows'

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    return apiGet(`/search/${searchOption}?q= ${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = (ev) => {
      setSearchOption(ev.target.value);
      
  }
  console.log(searchOption);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No result </div>;
    }
    if (results && results.length > 0) {
      return (
        results[0].show?results.map(item => (
            <div key={item.show.id}> {item.show.name}</div>))
            : results.map(item => (
            <div key={item.person.id}> {item.person.name}</div>))
      );
    } else {
      return null;
    }
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="  search for something "
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      ></input>
      <div>
        <label htmlFor="show-search">
          Shows
          <input id="show-search" type="radio" value="shows" checked={isShowSearch} onChange={onRadioChange} />
        </label>

        <label htmlFor="actor-search ">
          Actors
          <input id="actor-search" type="radio" value="people" checked={!isShowSearch} onChange={onRadioChange} />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
