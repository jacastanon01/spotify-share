export type TokenType = {
  name: string;
  sub?: string | null;
  accessToken: string;
  refreshToken: string;
  username: string | null;
  accessTokenExpires: number;
  user: { id: string | null; name: string | null };
  iat: number;
  exp: number;
  jti: string;
};

type SpotifyImageType = {
  height: number;
  url: string;
  width: number;
};

type SpotifyExternalUrlsType = {
  spotify: string;
};

export type SpotifyAlbumType = {
  album_type: string;
  artists: {
    external_urls: SpotifyExternalUrlsType;
    href: string | null;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  external_urls: SpotifyExternalUrlsType;
  href: string;
  id: string;
  images: SpotifyImageType[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type SpotifyArtistType = {
  external_urls: SpotifyExternalUrlsType;
  followers?: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  genres?: string[];
  images?: SpotifyImageType[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
};

export type SpotifyTrackType = {
  album: SpotifyAlbumType;
  artists: SpotifyArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: SpotifyExternalUrlsType;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyApiResponseType = {
  items: SpotifyArtistType | SpotifyTrackType;
};

// export enum TimeRangeEnum {
//   LONG,
//   MEDIUM,
//   SHORT,
// }

// export type SpotifyApiResponseType<T> = T extends {
//   items: { type: 'track' };
// }
//   ? {
//       items: SpotifyTrackType[];
//     }
//   : {
//       items: SpotifyArtistType[];
//     };

// export type SpotifyArtistResponseType = {
//   external_urls: SpotifyExternalUrlsType;
//   followers: {
//     href: string | null;
//     total: number;
//   };
//   genres: string[];
//   href: string;
//   id: string;
//   images: SpotifyImageType[];
//   name: string;
//   popularity: number;
//   type: string;
//   uri: string;
// };
