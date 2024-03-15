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
    <header className='mt-5 flex h-[70px] w-full items-center text-light-900'>
      <nav className='flex w-full items-center justify-between p-8'>
        <div className=' z-20 mt-[-18px] flex h-[70px] w-[180px] items-center justify-center rounded-lg bg-gray-500/20 p-4 backdrop-blur-md'>
          <Link
            href='https://spotify.com'
            target='_blank'
            className='absolute h-full w-full overflow-hidden rounded-lg'
          >
            <SpotifyLogo />
          </Link>
        </div>
        {session?.user ? (
          <div>
            <Button redirectUrl='/api/auth/signout' label='Sign out' />
          </div>
        ) : (
          <Button redirectUrl='/api/auth/signin' label='Sign in' />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
