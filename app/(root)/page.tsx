/// TODO: Create fetch component to fetch from api
// TODO: clean up layout
// TODO: store search params in url for

import Button from '@/components/ui/Button';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '../api/auth/[[...nextauth]]/route';
import { redirect } from 'next/navigation';
import { getProviders, useSession } from 'next-auth/react';
import Link from 'next/link';
import spotifyApi from '@/lib/utils/spotifyApi';
import { refreshAccessToken } from '@/lib/utils/refreshAccessToken';
import Center from '@/components/Center';
// import { headers } from "next/headers";
import SpotifyLogo from '@/components/ui/SpotifyLogo';
import Track from '@/components/playlist/Track';
import { getToken } from 'next-auth/jwt';
import TopTracksForm from '@/components/form/TopTracksForm';
import { Suspense, cache } from 'react';
import { fetchTracks } from '@/lib/utils/fetchTracks';
import Navbar from '@/components/navbar/Navbar';
import TrackContainer from '@/components/playlist/TrackContainer';

const getTracks = cache(
  async (accessToken: string | null | undefined) => {
    const res = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();

    return data;
  }
);

export default async function Home({
  searchParams,
}: {
  searchParams: {
    searchType?: string;
    timeRange?: string;
    limit?: string;
  };
}) {
  const session: sessionUser | null = await getServerSession(
    authOptions
  );
  const { searchType, timeRange, limit } = searchParams;
  // const headersList = headers();
  // const authHeader = headersList.get("Authorization");

  const topTracks = await fetchTracks({
    searchType,
    timeRange,
    limit,
  });

  if (!session?.user?.accessToken) {
    return (
      <div className='flex items-center flex-col mt-12 h-full w-full gap-12'>
        <SpotifyLogo width={250} height={400} />
        <Button
          label='Log in with Spotify'
          className='border-2 text-2xl font-publicSans font-bold'
          redirectUrl='/api/auth/signin?callbackUrl=/'
          //onClick={handleSpotifyAuth}

          // event handlers can't be passed in server components. For interactivity use client component
        />
        <p className='text-white lg:w-[650px]'>
          In order to share your music, you must authorize your
          spotify account with this application. Spotify provides a
          third-party client to handle authorization. Click above to
          sign in.{' '}
          <span className='max-md:hidden'>
            You will be prompted to log in which will trigger a
            request to their auth servers, and they will send an
            auth_code in the response. That code will be used in the
            callback request and once verified, the response will
            attach a session token to the user.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col px-8 md:px-24'>
      {/* <Home /> */}
      <Navbar />
      <section className='flex w-full relative flex-col gap-5 mx-auto my-6'>
        <div className='w-full'>
          <h1 className='text-5xl text-center font-mono uppercase font-bold mx-auto my-8'>
            Top tracks
          </h1>
          <TopTracksForm />
        </div>
        {/* <div className="flex flex-col w-full items-center"> */}
        {/* <UserList /> */}
        <Suspense fallback={'loading...'}>
          {topTracks?.items.map((track) => (
            <TrackContainer key={track.name} track={track} />
            // <Track track={track} key={track.name} />
          ))}
        </Suspense>

        {/* </div> */}
        {/* <Center session={session} /> */}
      </section>
    </div>
  );
}
