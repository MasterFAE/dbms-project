import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <div className="flex min-h-[4rem] items-center justify-between border-b px-16 py-2">
        <Link href={"/"}>
          <h2 className="text-2xl font-semibold">ESPT</h2>
        </Link>

        <div className=" flex items-center gap-x-8 ">
          <Link href={"/trip"}>
            <span className="text-xl hover:text-orange-600">Employee</span>
          </Link>
          <Link href={"/trip"}>
            <span className="text-xl hover:text-orange-600">Trip</span>
          </Link>
          <Link href={"/vehicle"}>
            <span className="text-xl hover:text-orange-600">Vehicle</span>
          </Link>
          <Link href={"/user"}>
            <span className="text-xl hover:text-orange-600">User</span>
          </Link>
          <Link href={"/"}>
            <span className="text-xl hover:text-orange-600">Payment</span>
          </Link>
          <Link href={"/"}>
            <span className="text-xl hover:text-orange-600">Card</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
