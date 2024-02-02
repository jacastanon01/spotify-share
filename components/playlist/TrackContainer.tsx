'use client';

import { SpotifyApiResponseType } from '@/types';
import TrackCard from './TrackCard';
import ArtistCard from './ArtistCard';
import { containerVariant, itemVariants } from '@/lib/utils/framerMotion';
import { MotionDiv } from '../ui/motion/MotionDiv';

const TrackContainer = ({
  track,
}: {
  track: SpotifyApiResponseType['items'];
}) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial='hidden'
      animate='show'
      exit='exit'
      className='mt-4 flex justify-center gap-6 rounded-xl bg-dark-500 sm:mt-14'
    >
      {track && (
        <>
          {track.type === 'artist' ? (
            <ArtistCard track={track} />
          ) : (
            <TrackCard track={track} />
          )}
        </>
      )}
    </MotionDiv>
  );
};

export default TrackContainer;
