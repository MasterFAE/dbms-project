import React from "react";

type Props = {
  icon: React.Node;
  title: string;
  value: number;
};

const StatCard = (props: Props) => {
  return (
    <div className="flex items-center justify-center gap-x-4 rounded bg-neutral-50 p-3 shadow">
      <div className="rounded-xl bg-orange-100 p-2">{props.icon}</div>
      <div>
        <p className="text-xl font-semibold text-orange-400">{props.value}</p>
        <p className="text-sm font-medium text-neutral-800">{props.title}</p>
      </div>
    </div>
  );
};

export default StatCard;
