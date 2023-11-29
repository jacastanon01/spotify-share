'use client';
import Image from 'next/image';
import Link from 'next/link';

import { SpotifyApiResponseType, SpotifyArtistType } from '@/types';

const TrackContainer = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <div className='flex mt-4 sm:mt-14 gap-6 bg-dark-500'>
      {track && 'album' in track && track.album && (
        <Link
          href={track.album.external_urls.spotify}
          target='_blank'
        >
          <Image
            // ? src={track.album.images[0].url ?? 'DEFAULT IMAGE'}
            src={track.album.images[0].url}
            alt={track.name}
            height={123}
            width={150}
          />
        </Link>
      )}
      <p>{track.name} by: </p> {/* {track.artists} */}
      {track &&
        'artists' in track &&
        track.artists?.map(({ name, id }: SpotifyArtistType) => (
          <p className='text-primary font-bold' key={id}>
            <Link href={track.external_urls.spotify} target='_blank'>
              {name}
            </Link>
          </p>
        ))}
    </div>
  );
};

export default TrackContainer;
