import Button from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/lib/utils/authOptions";
import { sessionUser } from "../api/auth/[[...nextauth]]/route";
import { redirect } from "next/navigation";
import { getProviders, useSession } from "next-auth/react";
import Link from "next/link";
import spotifyApi from "@/lib/utils/spotifyApi";
import { refreshAccessToken } from "@/lib/utils/refreshAccessToken";
import Center from "@/components/Center";
import { headers } from "next/headers";
import SpotifyLogo from "@/components/ui/SpotifyLogo";
import Track from "@/components/playlist/Track";
import { getToken } from "next-auth/jwt";
import TopTracksForm from "@/components/form/TopTracksForm";

const fetchArtists = async (artist) => {
  const session: sessionUser | null = await getServerSession(authOptions);
};

export default async function Home() {
  const session: sessionUser | null = await getServerSession(authOptions);
  const headersList = headers();
  const authHeader = headersList.get("Authorization");

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  const topTracks = await res.json();

  const fetchMoreInfo = await fetch(`https://api.spotify.com/v1/tracks?ids=`);

  // console.log("RESULTS: ", topTracks && topTracks?.items[0]);

  const moreInfo = (
    <p className="font-notoSerif">
      Congratualtions! Your account is now registered with this app! Read more
      about how spotify handles OAuth and the standards
      <span className="font-semibold font-publicSans text-primary">
        <Link
          href="https://developer.spotify.com/documentation/web-api/tutorials/code-flow"
          target="_blank"
        >
          {" "}
          Here
        </Link>
      </span>{" "}
      And for more information about OAuth process in general
      <span className="font-semibold font-publicSans text-primary">
        <Link
          href="https://datatracker.ietf.org/doc/html/rfc6749#section-4.1"
          target="_blank"
        >
          {" "}
          Click Here!
        </Link>
      </span>
    </p>
  );

  return (
    <section className="m-0 flex bg-dark mt-6 flex-col bg-gradient-to-t-(--primary-color)]">
      {session?.user?.accessToken ? (
        <div className=" px-8 md:px-24">
          <h1 className="h1-bold my-2">Authorized!</h1>
          {/* <Home /> */}
          <TopTracksForm />
          <section className="flex flex-col gap-5 overflow-y-scroll h-screen my-6">
            {/* <div className="flex flex-col w-full items-center"> */}
            {/* <UserList /> */}
            {topTracks?.items.map((track) => {
              console.log(typeof track);
              return <Track track={track} key={track.name} />;
            })}
            {/* </div> */}
            {/* <Center session={session} /> */}
          </section>
        </div>
      ) : (
        <div className="flex items-center flex-col mt-12 h-full w-full gap-12">
          <SpotifyLogo width={250} height={400} />
          <Button
            label="Log in with Spotify"
            className="border-2 text-2xl font-publicSans font-bold"
            redirectUrl="/api/auth/signin?callbackUrl=/"
            //onClick={handleSpotifyAuth}

            // event handlers can't be passed in server components. For interactivity use client component
          />
          <p className="text-white lg:w-[650px]">
            In order to share your music, you must authorize your spotify
            account with this application. Spotify provides a third-party client
            to handle authorization. Click above to sign in.{" "}
            <span className="max-md:hidden">
              You will be prompted to log in which will trigger a request to
              their auth servers, and they will send an auth_code in the
              response. That code will be used in the callback request and once
              verified, the response will attach a session token to the user.
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
