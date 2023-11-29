import Link from 'next/link';
import React from 'react';
import SpotifyLogo from '../ui/SpotifyLogo';
import Button from '../ui/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '@/app/api/auth/[[...nextauth]]/route';
import { SpotifyApiResponseType } from '@/types';

const Navbar = async () => {
  const session: sessionUser | null = await getServerSession(authOptions);

  return (
    <header className='text-light-900p-4 relative lg:px-8'>
      <nav className='flex items-center justify-between'>
        <div className=' bg-white z-20 mx-4 mt-[-18px] flex h-[150px] w-[150px] items-center justify-center rounded-lg p-4 opacity-90 backdrop-blur-md'>
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
