import { fetchTracks } from '@/lib/utils/fetchTracks';
import { SpotifyApiResponseType } from '@/types';
import React from 'react';
import TrackContainer from '../playlist/TrackContainer';

const FetchTracksFromApi = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const { searchType, timeRange, limit } = searchParams;

  const topTracks: Array<SpotifyApiResponseType['items']> =
    await fetchTracks({
      searchType,
      timeRange,
      limit,
    });

  return (
    <div>
      {topTracks &&
        topTracks?.length > 0 &&
        topTracks?.map((track) => (
          <TrackContainer key={track.name} track={track} />
        ))}
    </div>
  );
};

export default FetchTracksFromApi;
