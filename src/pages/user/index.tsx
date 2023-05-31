import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { User } from "~/types/user";

type Props = {};

const Index = (props: Props) => {
  const [users, setUsers] = useState([]);

  const deleteItem = async (user_id: number) => {
    await fetch(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user: User) => user.user_id != user_id));
  };

  useEffect(() => {
    (async () => {
      setUsers(await fetcher("/api/users"));
    })();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {users.length} Users
        </h1>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                SSN
              </th>
              <th className="px-6 py-3" scope="col">
                Name
              </th>
              <th className="px-6 py-3" scope="col">
                Last Name
              </th>
              <th className="px-6 py-3" scope="col">
                Date Of Birth
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {user.user_id}
                </th>
                <td className="px-6 py-4">{user.ssn}</td>
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <div className="flex h-full items-center justify-center">
                  <button
                    onClick={() => deleteItem(user.user_id)}
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
