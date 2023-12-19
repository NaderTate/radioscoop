"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

import ProgramsSection from "./ProgramsSection";
import ArticlesSection from "./ArticlesSection";
import FeaturesSection from "./FeaturesSection";

type Props = {
  announcerData: {
    name: string;
    posts: {
      id: string | null;
      title: string | null;
      image: string | null;
      type: { name: string } | null;
      PostMonth: { year: { year: string }; name: string } | null;
    }[];
    PresentedFeatures: {
      featureTitle: string | null;
      img: string | null;
      id: string | null;
      preparedBy: { name: string | null } | null;
    }[];
    PreparedFeatures: {
      featureTitle: string | null;
      img: string | null;
      id: string | null;
      presenter: { name: string | null } | null;
    }[];
    Categories: {
      id: string;
      img: string;
      name: string;
      month: { name: string; year: { year: string } } | null;
    }[];
  };
};

function AnnouncerTabs({ announcerData }: Props) {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center">
        <Tabs variant="bordered">
          {announcerData.Categories.length > 0 && (
            <Tab title="البرامج">
              <ProgramsSection Categories={announcerData.Categories} />
            </Tab>
          )}
          {announcerData.posts.length > 0 && (
            <Tab title="المقالات">
              <ArticlesSection posts={announcerData.posts} />
            </Tab>
          )}
          {(announcerData.PreparedFeatures.length > 0 ||
            announcerData.PresentedFeatures.length > 0) && (
            <Tab title="الفيتشرات">
              <FeaturesSection
                PreparedFeatures={announcerData.PreparedFeatures}
                PresentedFeatures={announcerData.PresentedFeatures}
                name={announcerData.name}
              />
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default AnnouncerTabs;
