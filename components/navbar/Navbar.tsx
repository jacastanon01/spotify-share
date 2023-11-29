import Link from 'next/link';
import React from 'react';
import SpotifyLogo from '../ui/SpotifyLogo';
import Button from '../ui/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '@/app/api/auth/[[...nextauth]]/route';
import { SpotifyApiResponseType } from '@/types';

const Navbar = async () => {
  const session: sessionUser | null = await getServerSession(
    authOptions
  );

  return (
    <header className='relative text-light-900p-4 lg:px-8'>
      <nav className='flex justify-between items-center'>
        <div className=' z-20 mx-4 mt-[-18px] h-[150px] w-[150px] flex items-center justify-center rounded-lg bg-white opacity-90 p-4 backdrop-blur-md'>
          <Link
            href='https://spotify.com'
            target='_blank'
            className='absolute h-full w-full overflow-hidden rounded-lg'
          >
            <SpotifyLogo />
          </Link>
        </div>
        {session?.user ? (
          <Button redirectUrl='/api/auth/signout' label='Sign out' />
        ) : (
          <Button redirectUrl='/api/auth/signin' label='Sign in' />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
