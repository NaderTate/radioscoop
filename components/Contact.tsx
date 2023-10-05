"use client";
import Image from "next/image";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  BsYoutube,
  BsWhatsapp,
  BsInstagram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";

const Contact = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className="px-5 m-1 py-2 dark:border-white border rounded-xl border-gray-500">
      <article
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
                src="https://mystation.micast.media/radio/8190/radio.mp3"
                onPlay={() => setPlay(true)}
                onPause={() => setPlay(false)}
                showSkipControls
              />
            </div>
            <div className="mt-4 sm:flex sm:items-center sm:gap-2"></div>
          </div>
        </div>
      </article>
      <div className="flex gap-2 my-4 text-center sm:text-right  flex-wrap items-center justify-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.abdelrhman305.radio"
          target="_blank"
          className="relative block overflow-hidden rounded-lg border border-gray-100 p-8"
          rel="noopener noreferrer"
        >
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
          <div className="justify-between sm:flex">
            <div>
              <h3 className="text-xl font-bold ">Radio Scoop App</h3>
              <p className="mt-1 text-xs font-medium ">
                حمل تطبيق راديو سكووب الان من جوجل بلاي
              </p>
            </div>
            <div className="flex mt-6 sm:mt-0 gap-3 justify-center">
              <div className=" flex-shrink-0">
                <Image
                  alt="logo"
                  className="rounded-md"
                  src="/googleplay.png"
                  width={60}
                  height={60}
                />
              </div>
              <div className="bg-white rounded-2xl w-16 h-16 p-1">
                <Image
                  alt="logo"
                  className="bg-white"
                  src="/favicon.png"
                  width={54}
                  height={54}
                />
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className=" mt-5 text-center md:text-base lg:text-lg">
        <div rel="noopener noreferrer">
          للاستفسار :
          <a href="tel:+01555868717" target="_blank" rel="noopener noreferrer">
            01114510001
          </a>
          -
          <a href="tel:+201555868717" target="_blank" rel="noopener noreferrer">
            01555868717
          </a>
        </div>
      </div>
      <div className="flex gap-2 my-4  flex-wrap items-center justify-center">
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-red-600 border-2 border-red-600 hover:text-red-600  rounded hover:bg-transparent focus:outline-none focus:ring active:opacity-75"
          href="https://www.youtube.com/channel/UCKIQWM21xi9XFgTf-FlnT4A"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube
          <BsYoutube className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-[#0077b5] border-2 border-[#0077b5] rounded hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75"
          href="https://www.facebook.com/attack.eg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
          <BsFacebook className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-green-500 border-2 border-green-500 rounded hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:opacity-75"
          href="https://api.whatsapp.com/send/?phone=201114510001&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whatsapp
          <BsWhatsapp className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-[#ea4c89] border-2 border-[#ea4c89] rounded hover:bg-transparent hover:text-[#ea4c89] focus:outline-none focus:ring active:opacity-75"
          href="https://www.instagram.com/radioscoopeg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
          <BsInstagram className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-sky-500 border-2 border-sky-500 rounded hover:bg-transparent hover:text-sky-500 focus:outline-none focus:ring active:opacity-75"
          href="https://twitter.com/RadioScoop2?s=09"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
          <BsTwitter className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-[#0077b5] border-2 border-[#0077b5] rounded hover:bg-transparent hover:text-[#0077b5] focus:outline-none focus:ring active:opacity-75"
          href="https://www.facebook.com/radioscoopeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
          <BsFacebook className="mr-2" />
        </a>
        <a
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition-colors bg-[#f0540b] border-2 border-[#f0540b] rounded hover:bg-transparent hover:text-[#f0540b] focus:outline-none focus:ring active:opacity-75"
          href="https://www.threads.net/@radioscoopeg?igshid=MzRlODBiNWFlZA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          Threads
          <Image
            width={20}
            height={20}
            src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1688896764/Radio/Frame_1_rtanbo.jpg"
            className="rounded-full mr-2"
            alt="Threads"
          />
        </a>
      </div>
    </div>
  );
};

export default Contact;
