"use client";
import Image from "next/image";
import Link from "next/link";

type trackProps = {
  name: string;
  albums?:
    | {
        images: string[];
        external_urls?: string;
      }
    | undefined;
  artists: Array<{ name: string; id: string }>;
};

const Track = ({ track }) => {
  return (
    <div className="flex gap-5">
      <Link href={track.album.external_urls.spotify} target="_blank">
        <Image
          src={track && track.album.images[0].url}
          alt={track.name}
          height={123}
          width={150}
        />
      </Link>
      <p>{track.name} by: </p> {/* {track.artists} */}
      {track.artists.map(({ name, id }) => {
        return (
          <p className="text-primary font-bold" key={id}>
            <Link href={track.external_urls.spotify} target="_blank">
              {name}
            </Link>
            {/* <Image src={images[0]?.url} alt={name} height={30} width={100} /> */}
          </p>
        );
      })}
    </div>
  );
};

export default Track;
