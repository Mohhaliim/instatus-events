'use client';

import React, { useState } from 'react'

import Image from 'next/image';
import Link from 'next/link';
import Loading from '../components/Loading/Loading';

export default function Login() {
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEmailNotFound(true);
    setIsLoading(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex-grow w-full mt-4">
        <div className="flex flex-col h-screen pt-16 pb-16 overflow-hidden text-black bg-white">
          <div className="relative flex items-center justify-center">
            <Link
              href={'/'}
              className="flex items-center justify-center group z-[1] w-24 h-24 rounded-full overflow-hidden border-[6px] hover:bg-gray-900 border-white bg-gray-950 transition duration-150"
            >
              <div className="h-9 w-9">
                <Image
                  src={'/instatus.svg'}
                  alt="instatus"
                  width={100}
                  height={100}
                  className="aspect-square"
                />
              </div>
            </Link>
            <div className="absolute z-0 left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] bg-gray-50" />
          </div>
          <div className="flex flex-col items-center w-full max-w-screen-lg gap-16 px-2 mx-auto mt-4 text-center grow">
            <h3 className="text-2xl font-semibold text-center">
              Login to your <span className="text-text-green">events</span> page
            </h3>
            <div className="flex flex-col justify-between w-full">
              <form
                action="submit"
                onSubmit={(e) => login(e)}
                className="flex flex-col items-center w-full gap-10"
              >
                <div className="flex flex-col items-center w-full">
                  <input
                    type="email"
                    placeholder="Email address"
                    className={`form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10 ${
                      emailNotFound
                        ? 'border-red-500 focus:border-red-500 '
                        : ''
                    }`}
                  />
                  <p
                    className={`transition-all duration-200 ease text-red-500 text-center translate-y-0 mt-2 ${
                      emailNotFound ? '' : 'hidden'
                    }`}
                  >
                    {"Email doesn't exist. Please sign up first."}
                  </p>
                </div>
                <div className="transition-all duration-200 ease-in-out flex flex-col items-center w-full">
                  <input
                    placeholder="Password"
                    type="password"
                    className={`form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10 ${
                      wrongPassword
                        ? 'border-red-500 focus:border-red-500 '
                        : ''
                    }`}
                  />
                  <p
                    className={`transition-all duration-200 ease-in-out text-red-500 text-center mt-2 hidden ${
                      wrongPassword ? '' : 'hidden'
                    }`}
                  >
                    Wrong Password
                  </p>
                </div>
                <button
                  type="submit"
                  className="relative flex items-center justify-center px-6 py-5 rounded-full w-full max-w-[24rem] font-medium text-white bg-gray-950 hover:bg-gray-950/90 dark:border dark:border-gray-900 dark:bg-gray-900/20 dark:hover:bg-gray-950 dark:hover:border-gray-900"
                >
                  {isLoading ? (
                    <Loading color="bg-white" />
                  ) : (
                    <div className="w-full text-center grow">
                      Login to your status page
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
