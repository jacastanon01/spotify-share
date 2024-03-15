/// TODO: Create fetch component to fetch from api
// TODO: clean up layout
// TODO: store search params in url for
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/utils/authOptions';
import { sessionUser } from '../api/auth/[[...nextauth]]/route';
import TopTracksForm from '@/components/form/TopTracksForm';
import Navbar from '@/components/navbar/Navbar';
import NoAuthHome from '@/components/home/NoAuthHome';
import FetchTracksFromApi from '@/components/home/FetchTracksFromApi';
import { MotionDiv } from '@/components/ui/motion/MotionDiv';
import { containerVariant } from '@/lib/utils/framerMotion';
import AnimatePresenceContainer from '@/components/ui/motion/AnimatePresence';

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
        <AnimatePresenceContainer>
          <MotionDiv
            variants={containerVariant}
            initial='hidden'
            animate='show'
            exit='exit'
          >
            <FetchTracksFromApi searchParams={searchParams} />
          </MotionDiv>
        </AnimatePresenceContainer>
      </section>
    </div>
  );
}
