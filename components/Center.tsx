"use client";

import { sessionUser } from "@/app/api/auth/[[...nextauth]]/route";
import spotifyApi from "@/lib/utils/spotifyApi";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

type sessionProps = {
  session?: sessionUser;
};

const Center = ({ session }: sessionProps) => {
  console.log(session);

  useEffect(() => {
    async function fetchTrack() {
      const topTracks = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      console.log(topTracks.json());
    }

    fetchTrack();
  }, [session]);

  //   const session = getServerSession(authOptions);
  return (
    <div className="flex-grow">
      <header className="absolute top-5">
        <div className="rounded-xl border-light-500 w-full">
          {session?.user && (
            <div>
              <Image
                src={session?.user.image || ""}
                alt="profile-pic"
                className="rounded-lg w-5 h-5"
              />
              <p className="text-white">{session?.user?.username || "PETE"}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Center;
