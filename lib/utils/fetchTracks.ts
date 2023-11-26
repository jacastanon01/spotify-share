'use server';
import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import spotifyApi from './spotifyApi';

export const fetchTracks = async ({
  searchType = 'tracks',
  timeRange = 'long',
  limit = '20',
}) => {
  const session = await getServerSession(authOptions);
  const access = spotifyApi.getAccessToken();
  console.log('FROM SPOTIFY API', access, searchType);
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/${searchType}?time_range=${timeRange}_term&limit=${limit}`,
    {
      headers: {
        //   "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  return data;
};
