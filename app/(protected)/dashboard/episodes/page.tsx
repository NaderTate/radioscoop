import Pagination from "@/components/Pagination";
import EpisodeForm from "@/app/(protected)/dashboard/episodes/_components/EpisodeForm";
import EpisodesTable from "@/app/(protected)/dashboard/episodes/_components/EpisodesTable";

import SearchInput from "@/components/dashboard/SearchInput";

import { getEpisodes, getPrograms, getCount } from "./utils";

type Props = {
  searchParams: { search: string; page: number };
};

async function page({ searchParams }: Props) {
  const { search, page } = searchParams;
  const itemsToShow = 30;

  const Episodes = await getEpisodes(search, page);

  const programs = await getPrograms();

  const count = await getCount(search);

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="grow">
        <div className="flex items-start sm:items-center gap-5 flex-col sm:flex-row">
          <EpisodeForm programs={programs} />
          <SearchInput />
        </div>
        <EpisodesTable programs={programs} data={Episodes} />
      </div>
      <Pagination
        currentPage={page}
        total={Math.ceil(count / itemsToShow)}
        queries={{ search }}
      />
    </div>
  );
}

export default page;
