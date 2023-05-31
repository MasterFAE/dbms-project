import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Employee } from "~/types/employee";
import { Route } from "~/types/route";
import { Trip } from "~/types/trips";
import { Vehicle } from "~/types/vehicle";
type Props = {};

const CreateTrip = (props: Props) => {
  const router = useRouter();
  const [data, setData] = useState<Trip>({
    trip_id: -1,
    status: "NOT_STARTED",
    vehicle_id: -1,
    employee_id: -1,
    route_id: -1,
    trip_details: "",
    startedAt: null,
    completedAt: null,
  });

  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      setVehicles(await fetcher("/api/vehicles?type=TRANSPORT"));
      setRoutes(await fetcher("/api/routes"));
      setEmployees(await fetcher("/api/employees?department_id=0"));
    })();
  }, []);

  const selectVehicle = (vehicle: Vehicle) => {
    if (vehicle.vehicle_id != data.vehicle_id)
      setData({ ...data, vehicle_id: vehicle.vehicle_id });
    else setData({ ...data, vehicle_id: -1 });
  };

  const selectEmployee = (employee: Employee) => {
    if (employee.employee_id != data.employee_id)
      setData({ ...data, employee_id: employee.employee_id });
    else setData({ ...data, employee_id: -1 });
  };

  const selectRoute = (route: Route) => {
    if (route.route_id != data.route_id)
      setData({ ...data, route_id: route.route_id });
    else setData({ ...data, route_id: -1 });
  };

  const createTrip = async () => {
    fetch("/api/trips", { method: "POST", body: JSON.stringify(data) }).then(
      // () => router.push("/trip")
      console.log
    );
  };

  return (
    <Layout>
      <p className="my-2 text-2xl font-semibold">Select a Vehicle</p>
      <div className="grid grid-cols-2 gap-2">
        {vehicles.map((vehicle: Vehicle) => (
          <>
            {vehicle.vehicle_id == data.vehicle_id ? (
              <button
                key={vehicle.vehicle_id}
                className="rounded border border-orange-600 bg-orange-100 p-2"
                onClick={() => selectVehicle(vehicle)}
              >
                <p className="text-lg font-semibold text-orange-500">
                  {vehicle.manufacturer + " " + vehicle.model}
                </p>
                <p className="text-sm font-light text-neutral-700">
                  {vehicle.plate}
                </p>
              </button>
            ) : (
              <button
                key={vehicle.vehicle_id}
                className="rounded border p-2 "
                onClick={() => selectVehicle(vehicle)}
              >
                <p className="text-lg font-semibold text-orange-600">
                  {vehicle.manufacturer + " " + vehicle.model}
                </p>
                <p className="text-sm font-light text-neutral-700">
                  {vehicle.plate}
                </p>
              </button>
            )}
          </>
        ))}
      </div>

      <p className="my-2 mt-6 text-2xl font-semibold">Select an Employee</p>
      <div className="grid grid-cols-2 gap-2">
        {employees.map((employee: Employee) => (
          <>
            {employee.employee_id == data.employee_id ? (
              <button
                key={employee.employee_id}
                className="rounded border border-orange-600 bg-orange-100 p-2"
                onClick={() => selectEmployee(employee)}
              >
                <p className="text-lg font-semibold text-orange-500">
                  {employee.firstName + " " + employee.lastName}
                </p>
              </button>
            ) : (
              <button
                key={employee.employee_id}
                className="rounded border p-2 "
                onClick={() => selectEmployee(employee)}
              >
                <p className="text-lg font-semibold text-orange-600">
                  {employee.firstName + " " + employee.lastName}
                </p>
              </button>
            )}
          </>
        ))}
      </div>

      <p className="my-2 mt-6 text-2xl font-semibold">Select a Route</p>
      <div className="grid grid-cols-2 gap-2">
        {routes.map((route: Route) => (
          <>
            {route.route_id == data.route_id ? (
              <button
                key={route.route_id}
                className="rounded border border-orange-600 bg-orange-100 p-2"
                onClick={() => selectRoute(route)}
              >
                <p className="text-lg font-semibold text-orange-500">
                  {route.label}
                </p>
                <p className="text-sm font-light text-neutral-700">
                  {route.length} km
                </p>
              </button>
            ) : (
              <button
                key={route.route_id}
                className="rounded border p-2 "
                onClick={() => selectRoute(route)}
              >
                <p className="text-lg font-semibold text-orange-600">
                  {route.label}
                </p>
                <p className="text-sm font-light text-neutral-700">
                  {route.length} km
                </p>
              </button>
            )}
          </>
        ))}
      </div>

      <button
        className="mt-6 w-full bg-blue-500 p-2 text-white"
        onClick={createTrip}
      >
        Create a Trip
      </button>
    </Layout>
  );
};

export default CreateTrip;
