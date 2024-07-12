'use client';

import React, { useState } from 'react';
import InstaLog from 'instalog';

import Loading from '../components/Loading/Loading';
import PopUp from '../components/PopUp/PopUp';

const instalog = new InstaLog(
  process.env.NEXT_PUBLIC_INSTALOG_SECRET_KEY as string,
  process.env.NEXT_PUBLIC_INSTALOG_BASE_URL as string
);

type EventObject = {
  id?: string;
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
  location?: string;
  occurred_at?: string;
  metadata: {
    [key: string]: string;
  };
}

interface FormElements extends HTMLFormControlsCollection {
  object: HTMLInputElement,
  actorId: HTMLInputElement,
  actorName: HTMLInputElement,
  group: HTMLInputElement,
  actionId: HTMLInputElement,
  actionObject: HTMLInputElement,
  actionName: HTMLInputElement,
  targetId: HTMLInputElement,
  targetName: HTMLInputElement,
  redirect: HTMLInputElement,
  description: HTMLInputElement,
}

interface CreateEventFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventCreated, setEventCreated] = useState<boolean>((false));
  const [eventError, setEventError] = useState<boolean>((false));

  const handleCreateEvent = async (eventData: EventObject) => {
    setIsLoading(true);

    try {
        const {status} = await instalog.createEvent(eventData);

        if(status === 200) {
          setEventCreated(true);

          setTimeout(() => {
            setEventCreated(false);
          }, 3000);
        }
    } catch (error) {
        setEventError(true);

        setTimeout(() => {
          setEventError(false);
        }, 3000);
    } finally {
        setIsLoading(false);
    }
};

  const createEvent = (e: React.FormEvent<CreateEventFormElement>): void => {
    e.preventDefault();

    const eventObject = {
      object: e.currentTarget.elements.object.value,
      actor_id: e.currentTarget.elements.actorId.value,
      actor_name: e.currentTarget.elements.actorName.value,
      group: e.currentTarget.elements.group.value,
      action: {
        id: e.currentTarget.elements.actionId.value,
        object: e.currentTarget.elements.actionObject.value,
        name: e.currentTarget.elements.actionName.value,
      },
      target_id: e.currentTarget.elements.targetId.value,
      target_name: e.currentTarget.elements.targetName.value,
      metadata: {
        redirect: e.currentTarget.elements.redirect.value,
        description: e.currentTarget.elements.description.value,
      },
    }
    handleCreateEvent(eventObject);
  };


  return (
    <div className="flex min-h-screen items-center justify-center">
      <PopUp color={'border-green-600 bg-green-400'} text={'Event created'} show={eventCreated}/>
      <PopUp color={'border-red-600 bg-red-400'} text={'Event not Created'} show={eventError}/>
      <div className="flex-grow w-full my-20">
        <form
          onSubmit={createEvent}
          action="submit"
          className="flex flex-col gap-10 items-center"
        >
          <div className="grid grid-cols-2 gap-5">
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Object"
              name="object"
              id="object"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Actor ID"
              name="actorId"
              id="actorId"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Actor Name"
              name="actorName"
              id="actorName"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Group"
              name="group"
              id="group"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Action Id"
              name="actionId"
              id="actionId"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Action Object"
              name="actionObject"
              id="actionObject"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Action Name"
              name="actionName"
              id="actionName"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Target Id"
              name="targetId"
              id="targetId"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Target Name"
              name="targetName"
              id="targetName"
              required
            />
            <input
              className="form-input mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Redirect"
              name="redirect"
              id="redirect"
              required
            />
            <input
              className="form-input mx-auto col-span-2 mt-0 px-2 transition-all ease-in-out duration-150 py-5 text-center text-base w-full max-w-[24rem] min-h-[4rem] max-h-[4rem] bg-gray-200 border border-gray-500 outline-none focus:ring-0 focus:border-gray-900 box-border text-black z-10"
              type="text"
              placeholder="Description"
              name="description"
              id="description"
              required
            />
          </div>
          <button
            type="submit"
            className=" px-6 py-5 rounded-full w-full max-w-[24rem] font-medium text-white bg-gray-950 hover:bg-gray-950/90"
          >
            {isLoading ? (
              <Loading color="bg-white" />
            ) : (
              <div className="w-full text-center grow">Create event</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
