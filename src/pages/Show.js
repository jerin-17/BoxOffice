/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../components/Show/ShowMainData';
import Details from '../components/Show/Details';
import Seasons from '../components/Show/Seasons';
import Cast from '../components/Show/Cast';
import { ShowPageWrapper, InfoBlock } from './Show.styled';
import { useShow } from '../Misc/custom-hooks';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;