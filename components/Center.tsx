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
  return <div className="flex"></div>;
};

export default Center;
