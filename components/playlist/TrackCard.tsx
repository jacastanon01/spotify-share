import Link from 'next/link';
import React from 'react';

import {
  SpotifyApiResponseType,
  SpotifyArtistType,
  SpotifyImageType,
  SpotifyTrackType,
} from '@/types';
import Image from 'next/image';
import spotifyApi from '@/lib/utils/spotifyApi';
import { getArtistById } from '@/lib/utils';

// ? Add this section above album image to display track listings of album on hover
{
  /* <div className='self-center'>
  <p className='z-30 md:hover:relative'>
    Track {track.track_number}/{track.album.total_tracks}
  </p>
</div>; */
}

const TrackCard = async ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  // ? figureout how to display artist in track card
  //? how to display artists in group, images, etc
  // const artist =
  //   'artists' in track && (await getArtistById(track.artists[0].id));

  // console.log('Artist: ', artist);
  return (
    <article className='w-full'>
      <div className='flex w-full items-center justify-between gap-4 p-4'>
        <div className='flex flex-col'>
          {'artists' in track &&
            track.artists
              ?.slice(0, 5)
              .map(({ name, id }: SpotifyArtistType) => (
                <div className=' text-primary hover:scale-y-125' key={id}>
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
        {track && (
          <div className='relative h-28 w-28 sm:h-64 sm:w-64'>
            <div className='flex h-full w-full flex-col sm:gap-3'>
              {'album' in track && track.album && (
                <Link
                  href={track.album.external_urls.spotify}
                  target='_blank'
                  className='text-white relative flex h-full w-full overflow-hidden rounded-lg'
                >
                  <div className='bg-black/10 z-10 w-full py-2 backdrop-opacity-90 max-md:hidden md:absolute md:inline'>
                    <p className='text-white z-30 line-clamp-2 px-4 font-inter text-2xl'>
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
        )}
      </div>
    </article>
  );
};

export default TrackCard;
