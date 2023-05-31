import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  width?: string;
};

const Layout = ({ children, width }: Props) => {
  return (
    <main>
      <Navbar />
      <div className="min-h-[100vh] bg-neutral-50 py-4">
        {width == "full" ? (
          <div className="mx-auto mt-4 min-h-[50vh] w-full rounded border bg-white p-4">
            {children}
          </div>
        ) : (
          <div className="mx-auto mt-4 min-h-[50vh] rounded border bg-white p-4 lg:w-full xl:w-3/4">
            {children}
          </div>
        )}
      </div>
    </main>
  );
};

export default Layout;
