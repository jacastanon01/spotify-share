import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { SpotifyProfile } from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";

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
].join(" ");

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider<SpotifyProfile>({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      authorization: { params: { scope: scopes } },
    }),
  ],
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
