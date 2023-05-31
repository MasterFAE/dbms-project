import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />

      <div className="min-h-[100vh] bg-neutral-50 py-4">
        <div className="mx-auto mt-4 min-h-[50vh] rounded border bg-white p-4 lg:w-full xl:w-3/4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
