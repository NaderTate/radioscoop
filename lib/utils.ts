import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// covert the drive link to a downloadable link that can be used in an audio player
export const convertDriveLink = (url: string) => {
  let arr = url.split("/");
  let updatedLink = [
    arr[0],
    "//",
    arr[2],
    "/",
    "uc?export=open&id=",
    arr[5],
  ].join("");
  return updatedLink;
};

// restore the drive link to its original form
export const ReverseAudioDriveLink = (updatedLink: string) => {
  const id = updatedLink.split("id=")[1];
  const originalUrl = `https://drive.google.com/file/d/${id}/view`;
  return originalUrl;
};
