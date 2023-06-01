import { User } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Vehicle } from "~/types/vehicle";

type Props = {};

const Index = (props: Props) => {
  const [vehicles, setVehicles] = useState([]);

  const deleteItem = async (id: number) => {
    await fetch(`/api/vehicles/${id}`, {
      method: "DELETE",
    });
    setVehicles(
      vehicles.filter((vehicle: Vehicle) => vehicle.vehicle_id != id)
    );
  };

  const fetchVehicleRanking = async () => {
    const res = await fetcher("/api/vehicles?type=vehicle_ranking");
    alert(
      `Vehicle Ranking: \n${res
        .map(
          (vehicle: Vehicle, index: number) =>
            `${index + 1}. ${vehicle.manufacturer} ${vehicle.model} ${
              vehicle.year
            } - ${vehicle.total_trips} trips completed.`
        )
        .join("\n")}`
    );
  };

  useEffect(() => {
    (async () => {
      setVehicles(await fetcher("/api/vehicles"));
    })();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Vehicles</title>
      </Head>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between">
          <h1 className="my-2 text-center text-xl font-semibold">
            {vehicles.length} Vehicles
          </h1>
          <div className="flex gap-x-2">
            <button
              onClick={fetchVehicleRanking}
              className="border-2 border-blue-600 px-2 text-blue-600"
            >
              Fetch Vehicle Ranking
            </button>

            <Link href={"/vehicle/create"}>
              <button className="addButton p-2">Create</button>
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                Manufacturer
              </th>
              <th className="px-6 py-3" scope="col">
                Model
              </th>
              <th className="px-6 py-3" scope="col">
                Year
              </th>
              <th className="px-6 py-3" scope="col">
                Plate
              </th>
              <th className="px-6 py-3" scope="col">
                Color
              </th>
              <th className="px-6 py-3" scope="col">
                Mileage
              </th>
              <th className="px-6 py-3" scope="col">
                Type
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: Vehicle) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {vehicle.vehicle_id}
                </th>
                <td className="px-6 py-4">{vehicle.manufacturer}</td>
                <td className="px-6 py-4">{vehicle.model}</td>
                <td className="px-6 py-4">{vehicle.year}</td>
                <td className="px-6 py-4">{vehicle.plate}</td>
                <td className="px-6 py-4">{vehicle.color}</td>
                <td className="px-6 py-4">{vehicle.mileage.toFixed(2)} km</td>
                <td className="px-6 py-4">{vehicle.type}</td>
                <div className="flex h-full items-center justify-center">
                  <button
                    onClick={() => deleteItem(vehicle.vehicle_id)}
                    className="rounded-lg bg-red-600 p-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Index;
