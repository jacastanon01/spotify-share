'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SpotifyApiResponseType } from '@/types';

const TopTracksForm = () => {
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState(
    searchParams.get('searchType') || 'tracks',
  );
  const [timeRange, setTimeRange] = useState(
    searchParams.get('timeRange') || 'long',
  );
  const [limit, setLimit] = useState(searchParams.get('limit') || '10');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(
      `?searchType=${searchType}&timeRange=${timeRange}&limit=${limit}`,
    );
  };

  // ? prompt: Find my top ${limit} ${searchType} that I listened to ${timeRange} ago

  return (
    <form
      className='flex w-full flex-col justify-center'
      onSubmit={handleSubmit}
    >
      <p className=' w-fit space-x-2 rounded-lg bg-dark-500 px-4 py-2 text-2xl max-md:leading-relaxed sm:text-5xl'>
        Find{' '}
        <input
          className='input text-center'
          type='number'
          min='1'
          max='20'
          value={limit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLimit(e.target.value)
          }
        />
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value as 'artists' | 'tracks')
          }
          className='input w-fit'
        >
          <option value='artists'>Artists</option>
          <option value='tracks'>Tracks</option>
        </select>{' '}
        that I listened to most these past
        <select
          className='input'
          value={timeRange}
          onChange={(e) => {
            setTimeRange(e.target.value);
            console.log(timeRange, searchType, limit);
          }}
        >
          <option value='long'>couple years</option>
          <option value='medium'>6 months</option>
          <option value='short'>4 weeks</option>
        </select>
      </p>
      {/* <section className='flex w-full flex-col justify-evenly lg:flex-row'>
          <div className='form-input'>
            <p className=''>Choose what to search</p>
            <select
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as 'artists' | 'tracks')
              }
              className='input text-black w-full'
            >
              <option value='artists'>Artists</option>
              <option value='tracks'>Tracks</option>
            </select>
          </div>
          <div className='form-input'>
            <p className=''>Choose the {searchType} that defined these times</p>
            <select
              className='input w-full'
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
        </section> */}

      <div className='mt-10 flex w-full justify-center'>
        <button className='btn font-bold' type='submit'>
          Get {searchType}
        </button>
      </div>
    </form>
  );
};

export default TopTracksForm;
