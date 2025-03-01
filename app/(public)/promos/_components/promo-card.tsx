"use client";

import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AiOutlineClose } from "react-icons/ai";

type Promo = {
  id: string;
  link: string;
  image?: string | null; // Not used since we display the category image
  category: {
    id: string;
    name: string;
    img: string;
  };
  presenters: { id: string; name: string }[];
};

type Props = {
  promo: Promo;
};

const PromoCard: React.FC<Props> = ({ promo }) => {
  const [open, setOpen] = useState(false);

  // Determine link type
  const isAudio = promo.link.endsWith(".mp3");
  const isYoutube =
    promo.link.includes("youtube.com") || promo.link.includes("youtu.be");

  const handleClick = () => {
    if (isAudio || isYoutube) {
      setOpen(true);
    }
  };

  // Renders the modal's inner content depending on link type
  const renderModalContent = () => {
    if (isAudio) {
      // AUDIO POPUP
      return (
        <div
          className="relative flex flex-col w-full h-full text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${promo.category.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Centered info */}
          <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold mb-2">{promo.category.name}</h2>
            <p className="mb-4">
              {promo.presenters.map((p) => p.name).join(", ")}
            </p>
          </div>
          {/* Audio player at the bottom */}
          <div className="w-full">
            <AudioPlayer autoPlay src={promo.link} />
          </div>
        </div>
      );
    } else if (isYoutube) {
      // YOUTUBE POPUP
      return (
        <div className="w-full h-0 relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={promo?.link?.match(/<iframe.*?src=["'](.*?)["']/)?.[1]}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* The Promo card itself */}
      <div className="relative aspect-square">
        {isAudio || isYoutube ? (
          // If it's audio or YouTube, clicking opens a modal popup
          <div onClick={handleClick} className="cursor-pointer">
            <Image
              src={promo.category.img}
              alt={promo.category.name}
              className="aspect-square object-cover brightness-[.6]"
            />
            <div className="text-white bg-black bg-opacity-40">
              <h5 className="absolute bottom-8 right-4 text-sm sm:text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
                {promo.category.name}
              </h5>
              <h5 className="absolute flex gap-x-1 bottom-4 right-4 text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
                {promo.presenters.map((p) => (
                  <span key={p.id}>{p.name}</span>
                ))}
              </h5>
            </div>
          </div>
        ) : (
          // Otherwise, just link externally
          <a
            href={promo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Image
              src={promo.category.img}
              alt={promo.category.name}
              className="aspect-square object-cover brightness-[.6]"
            />
            <div className="text-white bg-black bg-opacity-40">
              <h5 className="absolute bottom-8 right-4 text-sm sm:text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
                {promo.category.name}
              </h5>
              <h5 className="absolute flex gap-x-1 bottom-4 right-4 text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden z-10">
                {promo.presenters.map((p) => (
                  <span key={p.id}>{p.name}</span>
                ))}
              </h5>
            </div>
          </a>
        )}
      </div>

      {/* Modal Popup for Audio or YouTube */}
      {open && (isAudio || isYoutube) && (
        <div
          onClick={() => setOpen(false)} // Close when clicking the overlay
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Don't close when clicking inside the modal
            className={`bg-white rounded-xl overflow-hidden max-w-xl w-full  relative ${
              isAudio ? "aspect-square" : "aspect-video"
            }`}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl bg-black/50 p-2 rounded-full z-10"
            >
              <AiOutlineClose />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default PromoCard;
