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
          <Link href={"/departments"}>
            <span className="text-xl hover:text-orange-600">Departments</span>
          </Link>
          <Link href={"/employee"}>
            <span className="text-xl hover:text-orange-600">Employees</span>
          </Link>
          <Link href={"/routes"}>
            <span className="text-xl hover:text-orange-600">Routes</span>
          </Link>
          <Link href={"/trip"}>
            <span className="text-xl hover:text-orange-600">Trips</span>
          </Link>
          <Link href={"/vehicle"}>
            <span className="text-xl hover:text-orange-600">Vehicles</span>
          </Link>
          <Link href={"/user"}>
            <span className="text-xl hover:text-orange-600">Users</span>
          </Link>
          <Link href={"/"}>
            <span className="text-xl hover:text-orange-600">Payments</span>
          </Link>
          <Link href={"/"}>
            <span className="text-xl hover:text-orange-600">Cards</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
