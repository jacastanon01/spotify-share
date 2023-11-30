import Link from 'next/link';
import React from 'react';

import { SpotifyApiResponseType, SpotifyArtistType } from '@/types';
import Image from 'next/image';

const TrackCard = ({ track }: { track: SpotifyApiResponseType['items'] }) => {
  return (
    <article className='w-full'>
      <div className='flex w-full items-center justify-between gap-4 p-4'>
        <div className='flex flex-col'>
          <p className='mb-3 line-clamp-2 font-inter text-base md:text-3xl'>
            {track.name}:{' '}
          </p>
          {'artists' in track &&
            track.artists?.map(({ name, id }: SpotifyArtistType) => (
              <div className='text-primary hover:scale-y-125' key={id}>
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
        {track && 'album' in track && track.album && (
          <div className='relative h-32 w-32 flex-shrink-0 md:h-64 md:w-64'>
            <Link
              href={track.album.external_urls.spotify}
              target='_blank'
              className='absolute h-full w-full overflow-hidden rounded-lg'
            >
              <Image
                // ? src={track.album.images[0].url ?? 'DEFAULT IMAGE'}
                src={track.album.images[0].url}
                alt={track.name}
                fill
                className='object-contain'
                // width={track.album.images[0].width}
                // height={track.album.images[0].height}
              />
            </Link>
            {'preview_url' in track && track.preview_url && (
              <figure className='flex h-full items-end py-2'>
                <audio
                  className='w-full bg-primary/70'
                  controls
                  src={track.preview_url}
                />
              </figure>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default TrackCard;
