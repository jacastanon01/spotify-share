'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SpotifyApiResponseType } from '@/types';

const TopTracksForm = () => {
  const searchParams = useSearchParams();
  console.log('search params: ', searchParams.get('searchType'));
  const [searchType, setSearchType] = useState(
    searchParams.get('searchType') || 'tracks'
  );
  const [timeRange, setTimeRange] = useState(
    searchParams.get('timeRange') || 'long'
  );
  const [limit, setLimit] = useState(
    searchParams.get('limit') || '10'
  );
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('CLICK');
    e.preventDefault();

    router.push(
      `?searchType=${searchType}&timeRange=${timeRange}&limit=${limit}`
    );
  };

  // ? prompt: Find my top ${limit} ${searchType} that I listened to ${timeRange} ago

  return (
    <div className=''>
      <form className='w-full' onSubmit={handleSubmit}>
        <section className='w-full flex flex-col justify-evenly lg:flex-row'>
          <div className='form-input'>
            <p className=''>Choose what to search</p>
            <select
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as 'artists' | 'tracks')
              }
              className='w-full input text-black'
            >
              <option value='artists'>Artists</option>
              <option value='tracks'>Tracks</option>
            </select>
          </div>
          <div className='form-input'>
            <p className=''>
              Choose the {searchType} that defined these times
            </p>
            <select
              className='w-full input'
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
            <p className=''>How many {searchType}?</p>
            <input
              className='input'
              type='number'
              min='1'
              max='20'
              value={limit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLimit(e.target.value)
              }
            />
          </div>
        </section>

        <div className='w-full mt-10 flex justify-center'>
          <button className='btn font-bold' type='submit'>
            Get {searchType}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopTracksForm;
