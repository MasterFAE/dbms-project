import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Department } from "~/types/department";

type Props = {};

const Departments = (props: Props) => {
  const [departments, setDepartment] = useState([]);

  useEffect(() => {
    (async () => {
      setDepartment(await fetcher("/api/departments"));
    })();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {departments.length} Departments
        </h1>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                Department Name
              </th>
              <th className="px-6 py-3" scope="col">
                No. of Employees
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department: Department) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {department.department_id}
                </th>
                <td className="px-6 py-4 text-center">{department.name}</td>
                <td className="px-6 py-4 text-center">
                  {department.employee_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Departments;
