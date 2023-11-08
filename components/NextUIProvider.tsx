"use client";
import { NextUIProvider as Provider } from "@nextui-org/system";

function NextUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider>{children}</Provider>
    </div>
  );
}

export default NextUIProvider;
