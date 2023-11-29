import {
  SpotifyApiResponseType,
  SpotifyArtistType,
  SpotifyImageType,
} from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArtistCard = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <article className='w-full flex justify-center p-4'>
      <Link
        href={track.href}
        target='_blank'
        className='flex flex-col gap-6 items-center justify-between md:justify-center '
      >
        <p className='font-bold font-inter text-5xl'>{track.name}</p>
        {'images' in track && track.images && (
          <div
            className='relative h-96 w-96 rounded-lg'
            key={track.images[0].url}
          >
            <Image
              src={track.images[0].url}
              alt={track.images[0].url}
              fill
              className='object-contain rounded-lg'
            />
          </div>
        )}
      </Link>
    </article>
  );
};

export default ArtistCard;
