'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getRandomGradient } from '@/utils/getRandomGradient';

type RowType = {
  id: string;
  object: string;
  actor_id: string;
  actor_name: string;
  group: string;
  action: {
    id: string;
    object: string;
    name: string;
  };
  target_id: string;
  target_name: string;
  location: string;
  occurred_at: string;
  metadata: {
    [key: string]: string;
  };
};

export default function StatusRow({ row }: { row: RowType }) {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const firstLetter = row.actor_name.charAt(0).toUpperCase();
  const backgroundColor = getRandomGradient(firstLetter);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //format the data to this "Aug 7, 5:38 PM"
  return (
    <div className="relative">
      <div className="w-full grow grid grid-cols-3 text-gray-800 text-sm leading-[17px] hover:bg-gray-300 h-[54px] px-6">
        <div className="flex gap-2 items-center">
          <div style={{ background: backgroundColor }} className="w-[25px] aspect-square rounded-full text-white bg-red-500 flex items-center justify-center">
            {firstLetter}
          </div>
          <div>{row.target_name}</div>
        </div>
        <div className="flex items-center">{row.action.name}</div>
        <div className="flex items-center justify-between">
          <div>{row.occurred_at}</div>{' '}
          <button
            className="w-[8.67px] h-[13.59px]"
            onClick={() => setVisible(!visible)}
          >
            <Image src={'/more.svg'} alt="more" width={100} height={100} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className={`w-[102%] shadow absolute h-auto rounded-xl border bg-white border-gray-100 z-10 px-10 py-6 -left-[1%] top-0 flex-col ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex flex-col w-full gap-10">
          <div className="grid grid-cols-3 text-sm leading-[17px]">
            <div className="flex flex-col gap-4">
              <div className="text-gray-400 font-bold">ACTOR</div>
              <div className="flex flex-col gap-2">
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Name</div>
                  <div className="text-black">{row.actor_name}</div>
                </div>
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Email</div>
                  <div className="text-black">{row.target_name}</div>
                </div>
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">ID</div>
                  <div className="text-black">{row.target_id}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-gray-400 font-bold">ACTION</div>
              <div className="flex flex-col gap-2">
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Name</div>
                  <div className="text-black">{row.action.name}</div>
                </div>
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Object</div>
                  <div className="text-black">{row.action.object}</div>
                </div>
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">ID</div>
                  <div className="text-black">{row.action.id}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-gray-400 font-bold">DATE</div>
              <div className="flex flex-col gap-2">
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Readable</div>
                  <div className="text-black">{row.occurred_at}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 text-sm leading-[17px]">
            <div className="flex flex-col gap-4">
              <div className="text-gray-400 font-bold">METADATA</div>
              <div className="flex flex-col gap-2">
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Description</div>
                  <div className="text-black">{row.metadata.description}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-gray-400 font-bold">TARGET</div>
              <div className="flex flex-col gap-2">
                <div className="flex font-normal">
                  <div className="text-gray-400 w-[90px]">Group</div>
                  <div className="text-black">{row.group}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
