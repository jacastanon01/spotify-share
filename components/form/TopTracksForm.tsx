'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const TopTracksForm = () => {
  const [searchType, setSearchType] = useState('tracks');
  const [timeRange, setTimeRange] = useState('long');
  const [limit, setLimit] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('SUBMiTTING...');
    // const { items } = await fetchTracks({
    //   searchType,
    //   timeRange,
    //   limit,
    // });
    // setTracks(items);
    // console.log(items);
    router.push(
      `?searchType=${searchType}&timeRange=${timeRange}&limit=${limit}`
    );
  };

  return (
    <form className='' onSubmit={handleSubmit}>
      <div className='flex flex-col p-4 text-dark-300 bg-light-500 gap-5'>
        <section className='flex max-lg:flex-col lg:justify-evenly lg:items-center gap-4'>
          <div className='form-input'>
            <p>Choose what to search</p>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className='w-full text-black'
            >
              <option value='artists'>Artists</option>
              <option value='tracks'>Tracks</option>
            </select>
          </div>
          <div className='form-input'>
            <p>Choose the songs that defined these times</p>
            <select
              className='w-full'
              value={timeRange}
              onChange={(e) => {
                setTimeRange(e.target.value);
                console.log(timeRange, searchType, limit);
              }}
            >
              <option value='long'>All time</option>
              <option value='medium'>Past 6 months</option>
              <option value='short'>Past 4 weeks</option>
            </select>
          </div>
          <div className='form-input'>
            <p>How many songs?</p>
            <input
              type='number'
              min='1'
              max='50'
              value={limit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLimit(e.target.value)
              }
            />
          </div>
        </section>
        <section className='self-center'>
          <button className='btn font-bold' type='submit'>
            Submit
          </button>
        </section>
      </div>
    </form>
  );
};

export default TopTracksForm;
