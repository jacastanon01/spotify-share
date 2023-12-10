import { SpotifyApiResponseType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TrackPreview = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <div className='relative h-28 w-28 sm:h-64 sm:w-64'>
      <div className='flex h-full w-full flex-col sm:gap-3'>
        {'album' in track && track.album && (
          <Link
            href={track.album.external_urls.spotify}
            target='_blank'
            className='relative flex h-full w-full overflow-hidden rounded-lg text-white'
          >
            <div className='z-10 w-full bg-black/10 py-2 backdrop-opacity-90 max-md:hidden md:absolute md:inline'>
              <p className='z-30 line-clamp-2 px-4 font-inter text-2xl text-white'>
                {track.name}
              </p>
            </div>
            <Image
              // ? src={track.album.images[0].url ?? 'DEFAULT IMAGE'}
              src={track.album.images[0].url}
              alt={track.name}
              fill
              className='object-fit z-0 md:hover:opacity-30'
              // width={track.album.images[0].width}
              // height={track.album.images[0].height}
            />
          </Link>
        )}
        {'preview_url' in track && track.preview_url && (
          <figure className='hidden w-full items-center py-2 sm:flex'>
            {/* <figcaption className='line-clamp-1'>{track.name}</figcaption> */}
            <audio
              className='rounded-xl bg-primary/70'
              controls
              src={track.preview_url}
            />
          </figure>
        )}
      </div>
    </div>
  );
};

export default TrackPreview;
