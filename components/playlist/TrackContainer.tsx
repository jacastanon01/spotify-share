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
    <div className='flex justify-center mt-4 sm:mt-14 gap-6 bg-dark-500 rounded-xl md:mx-20'>
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
