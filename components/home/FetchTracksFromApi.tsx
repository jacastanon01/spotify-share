import { fetchTracks } from '@/lib/utils/fetchTracks';
import { SpotifyApiResponseType } from '@/types';
import React from 'react';
import TrackContainer from '../playlist/TrackContainer';
import { spotifyArtistResponse } from '@/constants/spotifyTrackResponse';

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
          // <Track track={track} key={track.name} />
        ))}
    </div>
  );
};

export default FetchTracksFromApi;
