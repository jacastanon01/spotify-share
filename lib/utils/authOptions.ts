import { NextAuthOptions } from 'next-auth';
import { SpotifyProfile } from 'next-auth/providers/spotify';
import { refreshAccessToken } from './refreshAccessToken';
import spotifyApi, { LOGIN_URL } from './spotifyApi';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider<SpotifyProfile>({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // initial login
      // console.log("JWT!!!!!!!!!!", account, user);
      if (account && user) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      } else if (Date.now() < token.accessTokenExpires) {
        // If the access token has not expired yet, return it
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      } else {
        // If the access token has expired, try to refresh it
        console.log('REFRESHING TOKEN NOW');
        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      spotifyApi.setAccessToken(token.accessToken);
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
  //   callbacks: {
  //     async redirect({ url, baseUrl }) {
  //       return baseUrl;
  //     },
  //   },
};
