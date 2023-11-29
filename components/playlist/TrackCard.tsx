import Link from 'next/link';
import React from 'react';

import { SpotifyApiResponseType, SpotifyArtistType } from '@/types';
import Image from 'next/image';

const TrackCard = ({ track }: { track: SpotifyApiResponseType['items'] }) => {
  return (
    <article className='w-full'>
      <div className='flex w-full items-center justify-between gap-6 p-16 md:flex-col md:justify-start'>
        {track && 'album' in track && track.album && (
          <div className='relative flex w-full justify-center rounded-lg md:px-32'>
            <Link
              href={track.album.external_urls.spotify}
              target='_blank'
              className='relative h-40 w-40 shrink-0 overflow-hidden md:h-96 md:w-96'
            >
              <Image
                // ? src={track.album.images[0].url ?? 'DEFAULT IMAGE'}
                src={track.album.images[0].url}
                alt={track.name}
                fill
              />
            </Link>
          </div>
        )}
        <div className='flex flex-col max-md:px-4'>
          <p className='font-inter text-base md:text-3xl'>{track.name}: </p>
          {'artists' in track &&
            track.artists?.map(({ name, id }: SpotifyArtistType) => (
              <div className='text-primary' key={id}>
                <Link
                  href={track.external_urls.spotify}
                  target='_blank'
                  className='font-roboto font-bold md:text-xl'
                >
                  {name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
};

export default TrackCard;
