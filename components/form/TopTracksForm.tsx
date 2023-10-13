"use client";

import { useState } from "react";

const TopTracksForm = () => {
  const [searchType, setSearchType] = useState("track");
  const [timeRange, setTimeRange] = useState("long");
  const [limit, setLimit] = useState("");

  return (
    <form>
      <div className="flex justify-center p-4 text-dark-300 bg-light-500 gap-5">
        <div className="flex text-dark-300">
          <p>Choose what to search</p>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="artist">Artist</option>
            <option value="track">Track</option>
          </select>
        </div>
        <div>
          <p>Choose the songs that defined these times</p>
          <select
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              console.log(timeRange, searchType, timeRange);
            }}
          >
            <option value="long">All time</option>
            <option value="medium">Past 6 months</option>
            <option value="short">Past 4 weeks</option>
          </select>
        </div>
        <div>
          <p>How many songs?</p>
          <input
            type="number"
            min="1"
            max="50"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default TopTracksForm;
