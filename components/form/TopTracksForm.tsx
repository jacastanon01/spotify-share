"use client";
import { fetchTracks } from "@/lib/utils/fetchTracks";
import spotifyApi from "@/lib/utils/spotifyApi";
import { useState } from "react";

const TopTracksForm = () => {
  const [searchType, setSearchType] = useState("tracks");
  const [timeRange, setTimeRange] = useState("long");
  const [limit, setLimit] = useState("");
  const [tracks, setTracks] = useState([]);

  const token = spotifyApi.getAccessToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMiTTING...");
    const { items } = await fetchTracks({ searchType, timeRange, limit });
    setTracks(items);
    console.log(items);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center flex-col items-center p-4 text-dark-300 bg-light-500 gap-5">
        <div className="flex-1">
          <p>Choose what to search</p>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full text-black"
          >
            <option value="artists">Artists</option>
            <option value="tracks">Tracks</option>
          </select>
        </div>
        <div className="flex-1">
          <p>Choose the songs that defined these times</p>
          <select
            className="w-full"
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              console.log(timeRange, searchType, limit);
            }}
          >
            <option value="long">All time</option>
            <option value="medium">Past 6 months</option>
            <option value="short">Past 4 weeks</option>
          </select>
        </div>
        <div className="flex-1">
          <p>How many songs?</p>
          <input
            type="number"
            min="1"
            max="50"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default TopTracksForm;
