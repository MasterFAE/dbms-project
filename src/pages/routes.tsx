import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Department } from "~/types/department";
import departments from "./departments";
import { Route } from "~/types/route";

type Props = {};

const Routes = (props: Props) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      setRoutes(await fetcher("/api/routes?stations=true"));
    })();
  }, []);

  const fetchMostPassenger = async () => {
    const result = await fetcher("/api/routes?type=most-passenger");
    alert(
      `Most Paid Route: ${result[0].label} with ${result[0].payment_count} payments.`
    );
  };

  const fetchLeastPassenger = async () => {
    const result = await fetcher("/api/routes?type=least-passenger");
    alert(
      `Least Paid Route: ${result[0].label} with ${result[0].payment_count} payments.`
    );
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {routes.length} Routes
        </h1>
        <div className="flex justify-center gap-x-2">
          <button
            onClick={fetchMostPassenger}
            className="my-4 w-fit bg-orange-400 p-2 text-white"
          >
            Fetch Most Passenger Routes
          </button>
          <button
            onClick={fetchLeastPassenger}
            className="my-4 w-fit border-2 border-orange-400 p-2 text-orange-400"
          >
            Fetch Least Passenger Routes
          </button>
        </div>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                Route Name
              </th>
              <th className="px-6 py-3" scope="col">
                Length
              </th>
              <th className="px-6 py-3" scope="col">
                No. of Stations
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route: Route) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {route.route_id}
                </th>
                <td className="px-6 py-4 text-center">{route.label}</td>
                <td className="px-6 py-4 text-center">{route.length} km</td>
                <td className="px-6 py-4 text-center">{route.station_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Routes;
