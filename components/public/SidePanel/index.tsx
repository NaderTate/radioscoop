import { NextPage } from "next";
import MainSidePanel from "./Main";
import { getSidePanelArticles } from "@/actions/articles";

const SidePanel: NextPage = async () => {
  const sidebarArticles = await getSidePanelArticles();
  return <MainSidePanel data={sidebarArticles?.Items} />;
};

export default SidePanel;
