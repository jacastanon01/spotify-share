import {
  SpotifyApiResponseType,
  SpotifyArtistType,
  SpotifyImageType,
} from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { itemVariants } from '@/lib/utils/framerMotion';
import { MotionArticle } from '../ui/motion/MotionArticle';

const ArtistCard = ({ track }: { track: SpotifyApiResponseType['items'] }) => {
  return (
    <MotionArticle
      variants={itemVariants}
      className='flex w-full justify-center p-4'
    >
      <Link
        href={track.href}
        target='_blank'
        className='flex flex-col items-center justify-between gap-6 md:justify-center '
      >
        <p className='font-inter text-5xl font-bold'>{track.name}</p>
        {'images' in track && track.images && (
          <div
            className='relative h-96 w-96 rounded-lg'
            key={track.images[0].url}
          >
            <Image
              src={track.images[0].url}
              alt={track.images[0].url}
              fill
              className='rounded-lg object-contain'
            />
          </div>
        )}
      </Link>
    </MotionArticle>
  );
};

export default ArtistCard;
