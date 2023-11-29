/// TODO: Create fetch component to fetch from api
// TODO: clean up layout
// TODO: store search params in url for
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '../api/auth/[[...nextauth]]/route';
import TopTracksForm from '@/components/form/TopTracksForm';
import { fetchTracks } from '@/lib/utils/fetchTracks';
import Navbar from '@/components/navbar/Navbar';
import TrackContainer from '@/components/playlist/TrackContainer';
import NoAuthHome from '@/components/home/NoAuthHome';
import Track from '@/components/playlist/Track';
import { SpotifyApiResponseType } from '@/types';
import FetchTracksFromApi from '@/components/home/FetchTracksFromApi';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) {
  const session: sessionUser | null = await getServerSession(
    authOptions
  );

  if (!session?.user?.accessToken) {
    return <NoAuthHome />;
  }

  return (
    <div className='flex flex-col px-8 md:px-24'>
      {/* <Home /> */}
      <Navbar />
      <section className='flex w-full relative flex-col gap-5 mx-auto my-6'>
        <TopTracksForm />

        {/* <div className="flex flex-col w-full items-center"> */}
        {/* <UserList /> */}
        <Suspense fallback={'loading...'}>
          <FetchTracksFromApi searchParams={searchParams} />
        </Suspense>

        {/* </div> */}
        {/* <Center session={session} /> */}
      </section>
    </div>
  );
}
