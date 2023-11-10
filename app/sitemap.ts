import prisma from "@/lib/prisma";
export default async function getSitemap() {
  const baseUrl = "https://www.radio-scoop.com";
  const episodes = await prisma.episode.findMany({
    select: {
      id: true,
    },
  });
  const episodesUrls =
    episodes.map((episode) => {
      return {
        url: `${baseUrl}/ep/${episode.id}`,
        changefreq: "weekly",
        priority: 1,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];
  const programs = await prisma.category.findMany({
    select: {
      id: true,
    },
  });
  const programsUrls =
    programs.map((program) => {
      return {
        url: `${baseUrl}/programs/${program.id}`,
        changefreq: "weekly",
        priority: 1,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];
  const announcers = await prisma.author.findMany({
    select: {
      id: true,
    },
  });
  const announcersUrls =
    announcers.map((announcer) => {
      return {
        url: `${baseUrl}/announcers/${announcer.id}`,
        changefreq: "weekly",
        priority: 1,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];
  return [
    {
      url: baseUrl,
      changefreq: "weekly",
      priority: 1,
      lastModified: new Date().toISOString(),
    },
    ...episodesUrls,
    ...programsUrls,
    ...announcersUrls,
  ];
}
