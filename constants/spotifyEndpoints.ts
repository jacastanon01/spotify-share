type SpotifyApiEndpointsType = {
  me: string;
  users: string;
  artists: string;
  tracks: string;
  playlists: string;
};

const baseUrl = 'https://api.spotify.com/v1';

export const spotifyApiEndpoints: SpotifyApiEndpointsType = {
  me: `${baseUrl}/me`,
  users: `${baseUrl}/users`,
  artists: `${baseUrl}/artists`,
  tracks: `${baseUrl}/tracks`,
  playlists: `${baseUrl}/playlists`,
};
