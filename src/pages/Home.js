import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../Misc/config.js';
import  ShowGrid  from '../components/Show/ShowGrid';
import ActorGrid  from '../components/Actor/ActorGrid';
import { useLastQuery } from '../Misc/custom-hooks';
import { SearchButtonWrapper,RadioInputsWrapper,SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';


const Home = () => {
  const [input, setInput] = useLastQuery( );
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

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

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No result </div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    } else {
      return null;
    }
  };
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="  search for something "
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      ></SearchInput>
      <RadioInputsWrapper>
        <div>
          <CustomRadio 
          label="Shows"
          id="show-search"
          value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
        <CustomRadio 
          label="Actors"
          id="actor-search"
          value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
       
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
