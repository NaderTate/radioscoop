"use client";

import { useState } from "react";
import { createEpisode, updateEpisode } from "@/actions/episodes";
import { ReverseAudioDriveLink } from "@/lib/utils";

export const useHandleEpisodeData = (episode?: {
  id: string;
  title: string;
  link: string;
  programId: string;
}) => {
  const [episodeData, setEpisodeData] = useState(
    episode
      ? {
          ...episode,
          link: episode?.link ? ReverseAudioDriveLink(episode.link) : "",
        }
      : { title: "", link: "", programId: "" }
  );

  const missingData = !(
    episodeData.title &&
    episodeData.link &&
    episodeData.programId
  );

  const onSubmit = async () => {
    if (episode?.id) {
      await updateEpisode(episode.id, { ...episodeData });
    } else {
      await createEpisode({ ...episodeData });
    }
  };

  return {
    episodeData,
    setEpisodeData,
    missingData,
    onSubmit,
  };
};
