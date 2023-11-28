import Image from 'next/image';

const SpotifyLogo = () => {
  return (
    <>
      <Image
        src='/assets/Spotify_logo.svg'
        alt='spotify-logo'
        fill
        className='object-contain'
      />
    </>
  );
};

export default SpotifyLogo;
