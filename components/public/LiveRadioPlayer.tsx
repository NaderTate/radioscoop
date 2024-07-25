"use client";

import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";

const LiveRadioPlayer = () => {
  const [play, setPlay] = useState(false);

  return (
    <section
      className="p-2 bg-white/50 sm:p-8 rounded-xl backdrop-blur ring ring-indigo-50 dark:bg-indigo-300/20"
      dir="ltr"
    >
      <div className="flex items-start">
        <div
          className={`hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500 ${
            play && "animate-pulse"
          }`}
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className={`h-8 w-0.5 rounded-full bg-indigo-500 `} />
            <span className={`h-6 w-0.5 rounded-full bg-indigo-500 `} />
            <span className={`h-4 w-0.5 rounded-full bg-indigo-500 `} />
            <span className={`h-6 w-0.5 rounded-full bg-indigo-500 `} />
            <span className={`h-8 w-0.5 rounded-full bg-indigo-500 `} />
          </div>
        </div>
        <div className="sm:ml-8 flex-grow">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white dark:text-indigo-50">
                مباشر
              </strong>
              <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white dark:text-indigo-50">
                راديو سكووب
              </strong>
            </div>
          </div>

          <div className="mt-10">
            <AudioPlayer
              // autoPlay
              src="https://a6.asurahosting.com:7040/radio.mp3"
              onPlay={() => setPlay(true)}
              onPause={() => setPlay(false)}
              showSkipControls
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveRadioPlayer;
