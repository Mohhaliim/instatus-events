import React from 'react';

type propsTypes = {
  color: string;
  text: string;
  show: boolean;
};

export default function PopUp({ color, text, show }: propsTypes) {
  return (
    <div
      className={`ease-in-out transition-transform duration-500 absolute right-10 top-5 w-52 h-12 ${color} border text-white text-lg font-semibold content-center text-center rounded-lg ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-56 opacity-100'
      }`}
    >
      {text}
    </div>
  );
}
