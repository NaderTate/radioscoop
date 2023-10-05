import Schedule from "@/components/Schedule";
import SidePanel from "@/components/SidePanel";
import React from "react";

function page() {
  return (
    <div>
      <SidePanel />
      <div className="hidden">
        <Schedule />
      </div>
    </div>
  );
}

export default page;
