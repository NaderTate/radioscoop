import prisma from "@/lib/prisma";

import BarChart from "./_components/charts/bar-chart";
import CountCard from "./count-card";

import { SiAirplayaudio } from "react-icons/si";
import { LuPersonStanding } from "react-icons/lu";
import { TbCategoryFilled } from "react-icons/tb";
import { MdArticle, MdOndemandVideo, MdOutlineAudioFile } from "react-icons/md";

async function Dashboard() {
  const episodesCount = await prisma.episode.count({
    where: { featured: false },
  });
  const featuresCount = await prisma.episode.count({
    where: { featured: true },
  });
  const categoriesCount = await prisma.category.count();
  const announcersCount = await prisma.author.count();
  const articlesCount = await prisma.post.count();
  const mediaScoopCount = await prisma.video.count();
  const seriesCount = await prisma.category.count({
    where: { series: true },
  });

  const announcers = await prisma.author.findMany({
    select: {
      Categories: { select: { _count: { select: { episodes: true } } } },
      _count: { select: { posts: true } },
      name: true,
    },
  });

  const announcersSortedByProgramsCount = announcers.sort(
    (a, b) => b.Categories.length - a.Categories.length
  );
  const announcersSortedByPostsCount = announcers.sort(
    (a, b) => b._count.posts - a._count.posts
  );

  const annoucersVsEpisodesCount = () => {
    const data = [];
    for (const announcer of announcers) {
      let episodesCount = 0;
      announcer.Categories.forEach((category) => {
        episodesCount += category._count.episodes;
      });
      data.push({ name: announcer.name, episodes: episodesCount });
    }
    data.sort((a, b) => b.episodes - a.episodes);
    return data;
  };

  const programs = await prisma.category.findMany({
    select: { _count: { select: { episodes: true } }, name: true },
  });
  programs.sort((a, b) => b._count.episodes - a._count.episodes);

  return (
    <>
      <div className="flex flex-wrap gap-5">
        <CountCard
          label="الحلقات"
          icon={<MdOutlineAudioFile />}
          count={episodesCount}
        />
        <CountCard
          label="الفيتشرات"
          icon={<SiAirplayaudio />}
          count={featuresCount}
        />
        <CountCard
          label="البرامج"
          icon={<TbCategoryFilled />}
          count={categoriesCount}
        />
        <CountCard
          label="المذيعين"
          icon={<LuPersonStanding />}
          count={announcersCount}
        />
        <CountCard
          label="المقالات"
          icon={<MdArticle />}
          count={articlesCount}
        />
        <CountCard
          label="المسلسلات"
          icon={<MdOndemandVideo />}
          count={seriesCount}
        />
        <CountCard
          label="ميديا سكووب"
          icon={<MdOndemandVideo />}
          count={mediaScoopCount}
        />
      </div>
      <BarChart
        label="المذيعين - عدد البرامج"
        labels={announcersSortedByProgramsCount
          .slice(0, 50)
          .map((announcer) => announcer.name)}
        values={announcersSortedByProgramsCount
          .slice(0, 50)
          .map((announcer) => announcer.Categories.length)}
      />

      <BarChart
        label="البرامج - عدد الحلقات"
        labels={programs.slice(0, 100).map((program) => program.name)}
        values={programs
          .slice(0, 100)
          .map((program) => program._count.episodes)}
      />

      <BarChart
        label="المذيعين - عدد المقالات"
        labels={announcersSortedByPostsCount
          .slice(0, 15)
          .map((announcer) => announcer.name)}
        values={announcersSortedByPostsCount
          .slice(0, 15)
          .map((announcer) => announcer._count.posts)}
      />

      <BarChart
        label="المذيعين - عدد الحلقات"
        labels={annoucersVsEpisodesCount()
          .slice(0, 100)
          .map((announcer) => announcer.name)}
        values={annoucersVsEpisodesCount()
          .slice(0, 100)
          .map((announcer) => announcer.episodes)}
      />
    </>
  );
}

export default Dashboard;
