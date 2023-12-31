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
import FetchTracksFromApi from '@/components/home/FetchTracksFromApi';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) {
  const session: sessionUser | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return <NoAuthHome />;
  }

  return (
    <div className='flex flex-col md:px-24'>
      <Navbar />
      <section className='relative mx-auto my-16 flex w-full flex-col gap-5 px-8'>
        <TopTracksForm />
        <FetchTracksFromApi searchParams={searchParams} />
      </section>
    </div>
  );
}
