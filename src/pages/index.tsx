import Layout from "~/components/Layout";
import { Route, type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Vehicle } from "~/types/vehicle";
import { Trip } from "~/types/trips";
import { timeFormatter } from "~/shared/timeFormatter";
import { IoMdBus, IoMdCard } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { CiRoute } from "react-icons/ci";
import StatCard from "~/components/Home/StatCard";
import fetcher from "~/shared/fetcher";
import Link from "next/link";
import TripCard from "~/components/TripCard";

/* 
  TODO
  - [ ] Add route page
  - [ ] Add vehicle page
  - [ ] Register Page
  - [ ] Login Page
  - [ ] Payment(EMPLOYEE) Page
  - [ ] Cards(EMPLOYEE) Page
  - [ ] Add new card button to user
  - [ ] User index page which contains card and payment information
  - [ ] Provide a ranking for drivers descending by the number of total completed trips
  - [ ] Provide a ranking for vehicles descending by the number of total completed trips
*/

const Home: NextPage = () => {
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [payments, setPayments] = useState("");
  const [routes, setRoutes] = useState(0);

  useEffect(() => {
    (async () => {
      await Promise.all([
        setTrips(await fetcher("/api/trips?type=MAINPAGE")),
        setUsers(await fetcher("/api/users?count=true")),
        setVehicles(await fetcher("/api/vehicles?count=true")),
        setPayments(
          await fetcher("/api/payments?type=income").then((res) => res[0].total)
        ),
        setRoutes(
          await fetcher("/api/routes?type=count").then(
            (res) => res[0].route_count
          )
        ),
      ]);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Public Transportation - Home Page</title>
      </Head>
      <Layout>
        <div className="">
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              title="User"
              icon={<FaUsers className="h-8 w-8 text-orange-400" />}
              value={users}
            />
            <StatCard
              title="Income"
              icon={<IoMdCard className="h-8 w-8 text-orange-400" />}
              value={"$" + payments}
            />
            <StatCard
              title="Vehicle"
              icon={<IoMdBus className="h-8 w-8 text-orange-400" />}
              value={vehicles}
            />
            <StatCard
              title="Routes"
              icon={<CiRoute className="h-8 w-8 text-orange-400" />}
              value={routes}
            />
          </div>
          <div className="mb-2 mt-6 flex items-center justify-between">
            <h2 className=" text-2xl font-medium text-neutral-800">Trips</h2>
            <Link href="/trip/create">
              <button className="h-fit rounded-lg bg-blue-400 p-2 text-white hover:bg-blue-600">
                Create
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {trips.map((trip: Trip & Vehicle & Route) => (
              <TripCard trip={trip} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
