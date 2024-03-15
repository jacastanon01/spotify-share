import React from 'react';
import Button from '../ui/Button';
import SpotifyLogo from '../ui/SpotifyLogo';

const NoAuthHome = () => {
  return (
    <div className='mt-12 flex w-full flex-col items-center gap-12'>
      <div className=''>
        <div className='relative h-[150px] w-[150px]'>
          <SpotifyLogo />
        </div>
      </div>
      <Button
        label='Log in with Spotify'
        className='border-2 font-publicSans text-2xl font-bold'
        redirectUrl='/api/auth/signin?callbackUrl=/'
        login={true}
        //onClick={handleSpotifyAuth}

        // event handlers can't be passed in server components. For interactivity use client component
      />
      <div className='px-6 text-lg text-white md:w-2/3'>
        <p>
          In order to share your music, you must authorize your spotify account
          with this application. Spotify provides a third-party client to handle
          authorization. Click above to sign in.{' '}
          <span className='max-md:hidden'>
            You will be prompted to log in which will trigger a request to their
            auth servers, and they will send an auth_code in the response. That
            code will be used in the callback request and once verified, the
            response will attach a session token to the user.
          </span>
        </p>
      </div>
    </div>
  );
};

export default NoAuthHome;
