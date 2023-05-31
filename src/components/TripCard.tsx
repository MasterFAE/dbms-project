import React from "react";
import { IoMdBus } from "react-icons/io";
import { timeFormatter } from "~/shared/timeFormatter";
import { Trip } from "~/types/trips";

type Props = {};

const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <div
      className="flex gap-x-3 rounded bg-neutral-50 p-3 shadow"
      key={trip.trip_id.toString()}
    >
      <div className="h-fit w-fit rounded border-2 border-orange-300 bg-orange-100 text-orange-400">
        <IoMdBus className="h-8 w-8" />
      </div>
      <div className="">
        <h1 className="text-lg font-medium text-orange-500">{trip.label}</h1>
        <p className="font-normal text-neutral-900">
          {trip.manufacturer} {trip.model}
        </p>

        <p className="font-normal text-neutral-900">{trip.plate}</p>
        <div className="mt-1 flex justify-between">
          {trip.status == "STARTED" && (
            <div className="w-fit rounded-xl border border-orange-100 bg-orange-200 px-2 py-1 text-xs font-semibold text-orange-700">
              STARTED
            </div>
          )}
          {trip.status == "COMPLETED" && (
            <div className="w-fit rounded-xl border border-green-100 bg-green-200 px-2 py-1 text-xs font-semibold text-green-700">
              COMPLETED
            </div>
          )}
          {trip.status == "NOT_STARTED" && (
            <div className="w-fit rounded-xl border border-red-100 bg-red-200 px-2 py-1 text-xs font-semibold text-red-700">
              NOT STARTED
            </div>
          )}
          <p className="font-extralight text-neutral-600">
            {timeFormatter(trip.startedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
