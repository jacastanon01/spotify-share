import Image from 'next/image';
import Link from 'next/link';

import { SpotifyApiResponseType, SpotifyArtistType } from '@/types';
import TrackCard from './TrackCard';
import ArtistCard from './ArtistCard';
import spotifyApi from '@/lib/utils/spotifyApi';

const TrackContainer = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <div className='mt-4 flex justify-center gap-6 rounded-xl bg-dark-500 sm:mt-14'>
      {track && (
        <>
          {track.type === 'artist' ? (
            <ArtistCard track={track} />
          ) : (
            <TrackCard track={track} />
          )}
        </>
      )}
    </div>
  );
};

export default TrackContainer;
