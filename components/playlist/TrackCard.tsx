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
import TrackPreview from '../search/TrackPreview';

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
        {track && <TrackPreview track={track} />}
      </div>
    </article>
  );
};

export default TrackCard;
