import Link from 'next/link';
import React from 'react';
import SpotifyLogo from '../ui/SpotifyLogo';
import Button from '../ui/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '@/app/api/auth/[[...nextauth]]/route';

const Navbar = async () => {
  const session: sessionUser | null = await getServerSession(
    authOptions
  );
  return (
    <header className='text-light-900 p-4 lg:px-8'>
      <nav className='flex justify-between items-center'>
        <Link
          href='https://spotify.com'
          target='_blank'
          className='relative h-[150px] w-[150px]'
        >
          <SpotifyLogo />
        </Link>
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
