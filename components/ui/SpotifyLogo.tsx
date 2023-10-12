import Image from "next/image";

type LogoProps = {
  height: number;
  width: number;
};

const SpotifyLogo = ({ width, height }: LogoProps) => {
  return (
    <>
      <Image
        src="/assets/Spotify_logo.svg"
        alt="spotify-logo"
        height={height}
        width={width}
        className="border-2"
      />
    </>
  );
};

export default SpotifyLogo;
