"use client";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import { Episode } from "@prisma/client";

import "react-h5-audio-player/lib/styles.css";
interface Episodee extends Episode {
  category: { name: string };
}
function AudioCard({ audio }: { audio: Episodee }) {
  const [duration, setDuration] = React.useState(0);
  const [play, setPlay] = React.useState(false);
  const timestamps = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = Math.floor(sec - hours * 3600 - minutes * 60);
    return `${hours ? hours + ":" : ""}${
      minutes ? minutes + ":" : ""
    }${seconds}`;
  };
  return (
    <div className="my-12">
      {audio.featured && (
        <div
          dir="rtl"
          className="my-4 md:mr-10 text-center font-semibold flex flex-col gap-1"
        >
          <div className="">{audio.featureTitle}</div>
          <div>{audio.category.name}</div>
          <div>تقديم {audio.presenter}</div>
        </div>
      )}
      <div
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.067), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), black), url(${audio.img}) `,
        }}
        className="  ring ring-indigo-50 dark:bg-indigo-300/10 flex mx-auto lg:max-w-screen-md flex-col relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat justify-end sm:h-[600px] sm:w-[600px] md:h-[800px] md:w-[800px] w-[90vw] h-[90vw] "
      >
        <article className="p-2 bg-white/50 sm:p-8 rounded-xl backdrop-blur ring ring-indigo-50 dark:bg-indigo-300/20 h-32 sm:h-48">
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
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-[2px] sm:px-3 sm:py-1.5 text-[10px] sm:font-medium  text-white dark:text-indigo-50">
                    {audio.featured ? audio.featureTitle : audio.category.name}
                  </strong>
                  {!audio.featured && (
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-[2px] sm:px-3 sm:py-1.5 text-[10px] sm:font-medium  text-white dark:text-indigo-50">
                      #الحلقة {audio.title}
                    </strong>
                  )}
                </div>
                <div className="flex items-center text-gray-500 dark:text-indigo-50">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="ml-1 text-xs font-medium dark:text-indigo-50">
                    {timestamps(duration)} minutes
                  </p>
                </div>
              </div>

              <div className="sm:mt-10">
                <AudioPlayer
                  autoPlay
                  src={audio.link}
                  onPlay={() => setPlay(true)}
                  onPause={() => setPlay(false)}
                  onLoadedData={(e: any) => setDuration(e.target.duration)}
                  // other props here
                  showSkipControls
                  autoPlayAfterSrcChange
                />
              </div>
              <div className="sm:mt-4 sm:flex sm:items-center sm:gap-2"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default AudioCard;
