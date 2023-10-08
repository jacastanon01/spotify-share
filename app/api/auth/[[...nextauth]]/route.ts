import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { SpotifyProfile } from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";
import { refreshAccessToken } from "@/lib/utils";

type SpotifyProviderType = {
  clientId: string | undefined;
  clientSecret: string | undefined;
  //   clientId: OAuthUserConfig<SpotifyProfile> | string | undefined;
  //   clientSecret: OAuthUserConfig<SpotifyProfile> | string | undefined;
};

let scopes = [
  "user-read-recently-played",
  "user-top-read",
  "streaming",
  "playlist-read-collaborative",
  "playlist-modify-public",
].join(",");

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider<SpotifyProfile>({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // initial login
      if (account && user) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account?.expires_at && account.expires_at * 1000,
        };
      } else if (Date.now() < token?.accessTokenExpires) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // If the access token has expired, try to refresh it
        return refreshAccessToken(token)
      }
      return {};
  },
  //   callbacks: {
  //     async redirect({ url, baseUrl }) {
  //       return baseUrl;
  //     },
  //   },
};

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST" && req.query.nextauth?.includes("callback")) {
//     console.log(req.query);
//     console.log("BODY ", req.body);
//   }
//   return await NextAuth(authOptions);
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
