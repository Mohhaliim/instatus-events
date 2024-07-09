'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useEvents } from './hooks/useEvents';
import Loading from './components/Loading/Loading';
import StatusRow from './components/StatusRow/StatusRow';

export default function Home() {
  const [live, setLive] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const {
    events,
    isLoading,
    isError,
    isValidating,
    size,
    setSize,
    isReachingEnd,
  } = useEvents(10);

  const [filteredEvents, setFilteredEvents] = useState(events || []);

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  useEffect(() => {
    if (!search) {
      setFilteredEvents(events);
    } else {
      const filtered = events?.filter(event =>
        event.actor_name.toLowerCase().includes(search.toLowerCase()) ||
        event.target_name.toLowerCase().includes(search.toLowerCase()) ||
        event.action.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [search, events]);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="max-w-[1440px] my-20 w-full justify-center flex">
        <div className="flex flex-col w-[90%] h-fit rounded-[15px] border border-gray-100">
          <div className="flex flex-col w-full bg-gray-100 p-6 gap-5 rounded-t-[15px]">
            <div className="flex w-full border border-gray-border rounded-lg h-11 pl-4">
              <input
                type="text"
                placeholder="Search name, email or action..."
                onChange={e => setSearch(e.target.value)}
                className="flex grow bg-gray-100 focus-visible:outline-none"
              />
              <div className="flex font-normal text-xs text-gray-500">
                <div className="w-px h-full bg-gray-border" />
                <button className="flex gap-1 px-4 items-center">
                  <div className="w-[15px] h-auto">
                    <Image
                      src={'/filters.svg'}
                      alt="filter"
                      width={100}
                      height={100}
                      className="aspect-square"
                    />
                  </div>
                  <div>Filter</div>
                </button>
                <div className="w-px h-full bg-gray-border" />
                <button className="flex gap-1 px-4 items-center">
                  <div className="w-[15px] h-auto">
                    <Image
                      src={'/export.svg'}
                      alt="filter"
                      width={100}
                      height={100}
                      className="aspect-square"
                    />
                  </div>
                  <div>Export</div>
                </button>
                <div className="w-px h-full bg-gray-border" />
                <button
                  className="flex gap-1 px-4 items-center"
                  onClick={() => setLive(!live)}
                >
                  <div
                    className={`w-4 h-4 ${
                      live ? 'bg-live' : 'bg-gray-500'
                    } rounded-full`}
                  />
                  <div>Live</div>
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-3 text-gray-500 font-bold text-sm leading-4">
              <div>ACTOR</div>
              <div>ACTION</div>
              <div>DATE</div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            {filteredEvents?.map((event, index) => (
              <StatusRow row={event} key={index} />
            ))}
          </div>
          <div className="flex justify-center w-full bg-gray-100 rounded-b-[15px]">
            <button
              onClick={loadMore}
              className="text-gray-500 font-bold text-sm leading-[17px] p-6 w-full"
              disabled={isReachingEnd}
            >
              {isValidating ? (
                <Loading color={"bg-gray-500"} />
              ) : isReachingEnd ? (
                'No more events'
              ) : (
                'Load more'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
