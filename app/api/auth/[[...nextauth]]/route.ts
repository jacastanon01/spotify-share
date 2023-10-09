import NextAuth from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { SpotifyProfile } from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";
import { refreshAccessToken } from "@/lib/utils/refreshAccessToken";
import spotifyApi, { LOGIN_URL } from "@/lib/utils/spotifyApi";
import { DefaultSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
type SpotifyProviderType = {
  clientId: string | undefined;
  clientSecret: string | undefined;
  //   clientId: OAuthUserConfig<SpotifyProfile> | string | undefined;
  //   clientSecret: OAuthUserConfig<SpotifyProfile> | string | undefined;
};

export interface sessionUser extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  };
}

let scopes = [
  "user-read-recently-played",
  "user-top-read",
  "streaming",
  "playlist-read-collaborative",
  "playlist-modify-public",
].join(",");

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST" && req.query.nextauth?.includes("callback")) {
//     console.log(req.query);
//     console.log("BODY ", req.body);
//   }
//   return await NextAuth(authOptions);
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
