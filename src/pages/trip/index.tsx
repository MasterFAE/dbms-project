import { Route } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import TripCard from "~/components/TripCard";
import fetcher from "~/shared/fetcher";
import { Trip } from "~/types/trips";
import { Vehicle } from "~/types/vehicle";

type Props = {};

const Index = (props: Props) => {
  const [trips, setTrips] = useState([]);
  const [delete_id, setDeleteId] = useState<number>(0);

  const deleteItem = async () => {
    await fetch(`/api/trips/${delete_id}`, {
      method: "DELETE",
    });
    setTrips(trips.filter((trip: Trip) => trip.trip_id != delete_id));
  };

  useEffect(() => {
    (async () => {
      setTrips(await fetcher("/api/trips"));
    })();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Trips</title>
      </Head>
      <div className="mb-2 mt-6 flex items-center justify-between">
        <h2 className=" text-2xl font-medium text-neutral-800">
          {trips.length} Trips
        </h2>
        <div className="flex items-center gap-x-3">
          <Link href="/trip/create">
            <button className="h-fit rounded-lg bg-blue-400 p-2 text-white hover:bg-blue-600">
              Create
            </button>
          </Link>
          <div>
            <input
              placeholder="DELETE: Enter ID"
              type="number"
              onChange={(e) => setDeleteId(e.target.value)}
              onKeyDown={(e) => e.key == "Enter" && deleteItem()}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-4">
        {trips.map((trip: Trip & Vehicle & Route) => (
          <TripCard trip={trip} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
