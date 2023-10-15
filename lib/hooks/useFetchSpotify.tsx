"use client";

import { useEffect, useState } from "react";
import spotifyApi from "../utils/spotifyApi";

type fetchPropTypes = {
  token: string;
  timeRange?: string;
  limit?: string;
  type: string;
};

const useFetchSpotify = ({
  token,
  timeRange = "long_term",
  limit = "10",
  type,
}: fetchPropTypes) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      const result = await res.json();
      return data;
    };
    token && fetchData();
  }, [limit, timeRange, token, type]);

  return <div>useFetchSpotify</div>;
};

export default useFetchSpotify;
