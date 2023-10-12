import Button from "@/components/Button";
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

export default async function Home() {
  const session: sessionUser | null = await getServerSession(authOptions);
  // const session = await getServerSession(authOptions);
  // const data = fetchData();
  // console.log(data);
  const headersList = headers();
  const authHeader = headersList.get("Authorization");
  // console.log(headersList, authHeader, "!!!!!!!!");
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

  console.log("RESULTS: ", topTracks.items[0]);

  // const session = useSession({
  //   required: true,
  //   onUnauthenticated: redirect("/api/auth/signin?callbackUrl=/"),
  // });

  // if (!session) redirect("/api/auth/signin?callbackUrl=/");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const topTracks = await fetch("https://api.spotify.com/v1/me", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.user?.accessToken}`,
  //       },
  //     });
  //     console.log(topTracks.json());
  //     return topTracks.json();
  //   };

  //   fetchData();
  // }, [session]);

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
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="w-screen min-h-screen bg-dark-200">
      <section className="text-light-900 px-4 lg:px-8">Navbar</section>
      <section className="flex bg-dark items-center mt-6 flex-col bg-gradient-to-t-(--primary-color)]">
        <div className="flex items-center flex-col mt-12 h-full w-full gap-12 px-24">
          {session?.user?.accessToken ? (
            <>
              <h1 className="h1-bold my-2">Authorized!</h1>
              <Button redirectUrl="/api/auth/signout" label="Sign out" />
              <section className="flex items-stretch gap-5 w-full">
                <div className="flex flex-col justify-evenly">
                  {/* <UserList /> */}
                  {topTracks?.items.map((track) => {
                    console.log(track.album.images[0].url);
                    return (
                      <li key={track.name}>
                        {track.name} by {/* {track.artists} */}
                        {track.artists.map(({ name, id }) => (
                          <p key={id}>
                            <Link
                              href={track.external_urls.spotify}
                              target="_blank"
                            >
                              {name}
                            </Link>
                          </p>
                        ))}
                        <Image
                          src={track.album.images[0]}
                          alt={track.name}
                          height={123}
                          width={118}
                        />
                      </li>
                    );
                  })}
                </div>
                {/* <Center session={session} /> */}
                <div className="flex-1 items-center bg-dark-400 text-light-850">
                  <div className="flex justify-between items-center w-full text-(--primary-color)">
                    <p>Song name</p>
                    <Image src="" alt="image" height={50} width={50} />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p>Song name</p>
                    <Image src="" alt="image" height={50} width={50} />
                  </div>
                  <div className="flex justify-items-center between w-full">
                    <p>Song name</p>
                    <Image src="" alt="image" height={50} width={50} />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p>Song name</p>
                    <Image src="" alt="image" height={50} width={50} />
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <Image
                src="/assets/Spotify_logo.svg"
                alt="spotify-logo"
                height={250}
                width={400}
                className="border-2"
              />
              <Button
                label="Log in with Spotify"
                className="border-2 text-2xl font-publicSans font-bold"
                redirectUrl="/api/auth/signin?callbackUrl=/"
                //onClick={handleSpotifyAuth}

                // event handlers can't be passed in server components. For interactivity use client component
              />
              <p className="text-white font-notoSarif lg:w-[650px]">
                In order to share your music, you must authorize your spotify
                account with this application. Spotify provides a third-party
                client to handle authorization. Click above to sign in.{" "}
                <span className="max-md:hidden">
                  You will be prompted to log in which will trigger a request to
                  their auth servers, and they will send an auth_code in the
                  response. That code will be used in the callback request and
                  once verified, the response will attach a session token to the
                  user.
                </span>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
