'use client';

import { useState } from 'react';
import Image from 'next/image';
import StatusRow from './components/StatusRow/StatusRow';

export default function Home() {
  const [live, setLive] = useState<boolean>(false);

  const row = {
    "id": "evt_15B56WILKW5K",
    "object": "event",
    "actor_id": "user_3VG74289PUA2",
    "actor_name": "Ali Salah",
    "group": "instatus.com",
    "action": {
      "id": "evt_action_PGTD81NCAOQ2",
      "object": "event_action",
      "name": "user.login_succeeded"
    },
    "target_id": "user_DOKVD1U3L030",
    "target_name": "ali@instatus.com",
    "location": "105.40.62.95",
    "occurred_at": "2022-01-05T14:31:13.607Z",
    "metadata": {
      "redirect": "/setup",
      "description": "User login succeeded.",
      "x_request_id": "req_W1Y13QOHMI5H"
    },
  }


  return (
    <div className="flex min-h-screen justify-center">
      <div className="max-w-[1440px] mt-20 w-full justify-center flex">
        <div className="flex flex-col w-[90%] h-fit rounded-[15px] border border-gray-100">
          <div className="flex flex-col w-full bg-gray-100 p-6 gap-5 rounded-t-[15px]">
            <div className="flex w-full border border-gray-border rounded-lg h-11 pl-4">
              <input
                type="text"
                placeholder="Search name, email or action..."
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
            <StatusRow row={row} />
            <StatusRow row={row} />
            <StatusRow row={row} />
            <StatusRow row={row} />
            <StatusRow row={row} />
          </div>
          <div className="flex justify-center w-full bg-gray-100 rounded-b-[15px] p-6">
            <button className="text-gray-500 font-bold text-sm leading-[17px]">
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
