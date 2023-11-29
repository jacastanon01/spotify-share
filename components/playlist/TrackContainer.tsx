import Image from 'next/image';
import Link from 'next/link';

import { SpotifyApiResponseType, SpotifyArtistType } from '@/types';
import TrackCard from './TrackCard';
import ArtistCard from './ArtistCard';

const TrackContainer = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <div className='mt-4 flex justify-center gap-6 rounded-xl bg-dark-500 sm:mt-14 md:mx-20'>
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
