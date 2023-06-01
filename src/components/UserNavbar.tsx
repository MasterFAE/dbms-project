import Link from "next/link";
import React from "react";

type Props = {
  username: string;
};

const UserNavbar = (props: Props) => {
  if (!props.username) props.username = "User";
  return (
    <nav>
      <div className="flex min-h-[4rem] items-center justify-between border-b px-16 py-2">
        <Link href={"/client"}>
          <h2 className="text-2xl font-semibold">ESPT</h2>
        </Link>

        <div className=" flex items-center gap-x-8 ">{props.username}</div>
      </div>
    </nav>
  );
};

export default UserNavbar;
