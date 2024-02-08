import prisma from "@/lib/prisma";

import Posts from "./_components/Posts";
import { getSidePanelArticles } from "@/actions/articles";

async function page() {
  const postsData = await getSidePanelArticles();
  return <Posts data={postsData} />;
}

export default page;
