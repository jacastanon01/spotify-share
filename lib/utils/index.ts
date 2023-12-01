import { DefaultSession, Session, getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import spotifyApi from './spotifyApi';
import { spotifyApiEndpoints } from '@/constants/spotifyEndpoints';
import { SpotifyArtistType } from '@/types';

export const fetchTracks = async ({
  searchType = 'tracks',
  timeRange = 'long',
  limit = '10',
}) => {
  const session: Session | null = await getServerSession(authOptions);
  const access = spotifyApi.getAccessToken();

  const url = `${spotifyApiEndpoints.me}/top/${searchType}?time_range=${timeRange}_term&limit=${limit}`;
  const options = {
    headers: {
      //   "Content-Type": "application/json",
      Authorization: session?.user && `Bearer ${session?.user?.accessToken}`,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data.items;
};

export const getArtistById = async (id: string) => {
  const { body } = await spotifyApi.getArtist(id);
  return body;
  //   const res = await fetch(`${spotifyApiEndpoints.artists}/${id}`);
};

export const getRecentlyPlayedTracks = async () => {
  const res = await spotifyApi.getMyRecentlyPlayedTracks();
  const {
    body: { items },
  } = res;
  items.length > 0 &&
    items.map((item) => {
      const playedAt = new Date(item.played_at);
      console.log(playedAt.getMonth());
    });
};
